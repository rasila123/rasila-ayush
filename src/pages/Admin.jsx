import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Admin.css';

// Platform logos - should match the Platforms.jsx logoMap
const logoMap = {
  'iTunes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIiKOracQ8AnYdnjgy-CQe3Qkot0e0CU5XwQ&s',
  'Shazam': 'https://img.icons8.com/color/96/shazam.png',
  'Apple Music': 'https://www.shutterstock.com/image-vector/apple-music-logos-popular-streaming-600nw-2326870177.jpg',
  'Spotify': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhm0QX77yGJFrD_lk6iASPtpxc_is48Sc_g&s',
  'Amazon Music': 'https://wallpapers.com/images/hd/amazon-music-logo-owwdlwkbkbplmz91-2.jpg',
  'Audible': 'https://cdn.worldvectorlogo.com/logos/audible.svg',
  'Snapchat': 'https://i.pinimg.com/736x/65/25/ea/6525ea3430a2145e472ce030dd98bdcb.jpg',
  'Canva': 'https://img.icons8.com/color/96/canva.png',
  'Pandora': 'https://img.icons8.com/color/96/pandora-app.png',
  'YouTube': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2E5Huc3ioxoXvRVn1phb8yWyk9jOjOWI8Q&s',
  'YouTube Shorts': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXlieX-1UjEMJUoe21hpPXUx6jOrKsYfJiA&s',
  'gaana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gaana_%28music_streaming_service%29_logo.png/1200px-Gaana_%28music_streaming_service%29_logo.png',
  'SoundCloud': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx1Qi6WJbO3ub1j4_pWBeajrs1A4wYL1sEmA&s',
  'Saavn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/JioSaavn_Logo.svg/1024px-JioSaavn_Logo.svg.png',
  'Anghami Music': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOW63bhTaI5XulvseNt7vUInE5fEyCHzasuw&s',
  'Facebook': 'https://img.icons8.com/color/96/facebook-new.png',
  'Instagram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
  'WhatsApp': 'https://img.icons8.com/color/96/whatsapp--v1.png',
  'YouTube Music': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/YouTube_Music_2024.svg',
  'WeSing': 'https://play-lh.googleusercontent.com/R8ROhhJoi-A34JeO_nVb8-FSznLvCLnMvrN-gCWH_9HilcXyhC1KKF__yCsY6hjfThox=s96-rw',
  'TikTok': 'https://img.icons8.com/color/96/tiktok--v1.png',
  'Hungama Music': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStY-aRGGKFmYDq69A8kitKLeH1b7Ga6fBA6Q&s',
  'Resso': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpx4wBqh5oFPnIHc7gYBZMmuostvCCO1TWsw&s',
  'Wynk Music': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Wynk_music_logo.png',
  'Audible Magic': 'https://www.audiblemagic.com/wp-content/uploads/2019/08/AM-Logo.png',
  'Rdio': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAsKIPKN1PnFJOJn4ItiP9LZrFkc1qjt7DOw&s'
};

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [songUrl, setSongUrl] = useState('');
  const [songImage, setSongImage] = useState(null);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artistPhoto, setArtistPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [songs, setSongs] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const navigate = useNavigate();
  const [option, setOption] = useState(null);
  const [editSong, setEditSong] = useState(null);
  
  // Platform links state
  const [platformLinks, setPlatformLinks] = useState({});
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);
  const [editPlatformName, setEditPlatformName] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      const { data } = await supabase.from('artists').select('name');
      if (data) {
        setArtistList(data.map(a => a.name));
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoadingSongs(true);
      const { data } = await supabase.from('songs').select('*');
      if (data) setSongs(data);
      setLoadingSongs(false);
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchPlatformLinks = async () => {
      setLoadingPlatforms(true);
      try {
        const { data } = await supabase.from('platforms').select('name, link');
        
        const linksMap = {};
        
        // First, add all platforms from logoMap with empty links
        Object.keys(logoMap).forEach(name => {
          linksMap[name] = '';
        });
        
        // Then, update with actual links from database
        if (data) {
          data.forEach(platform => {
            if (platform.name && platform.link) {
              linksMap[platform.name] = platform.link;
            }
          });
        }
        
        setPlatformLinks(linksMap);
      } catch (err) {
        console.error('Error fetching platform links:', err);
        const linksMap = {};
        Object.keys(logoMap).forEach(name => {
          linksMap[name] = '';
        });
        setPlatformLinks(linksMap);
      }
      setLoadingPlatforms(false);
    };
    
    if (option === 'platforms') {
      fetchPlatformLinks();
    }
  }, [option]);

  const refreshSongs = async () => {
    setLoadingSongs(true);
    const { data } = await supabase.from('songs').select('*');
    if (data) setSongs(data);
    setLoadingSongs(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { data, error: dbError } = await supabase.from('password').select('password');
    if (dbError || !data) {
      console.error('Supabase error fetching passwords:', dbError);
      setError(dbError ? `Error fetching secret codes: ${dbError.message}` : 'Error fetching secret codes from server.');
      setAuthed(false);
      return;
    }
    const entered = secret.trim();
    const passwords = data.map(r => (r.password || '').toString());
    if (!passwords.includes(entered)) {
      setError('Incorrect secret code.');
      setAuthed(false);
      return;
    }
    setAuthed(true);
  };

  const handleLogout = async () => {
    setAuthed(false);
    setSecret('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSongImage(e.target.files[0]);
    }
  };

  const handleArtistPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArtistPhoto(e.target.files[0]);
    }
  };

  const uploadFileAndGetURL = async (file, bucket, path) => {
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrlData.publicUrl;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this song?')) return;
    const { data: songData } = await supabase.from('songs').select('artist').eq('id', id).single();
    let artistNameToDelete = songData ? songData.artist : null;
    await supabase.from('songs').delete().eq('id', id);
    if (artistNameToDelete) {
      const { data: remainingSongs } = await supabase.from('songs').select('id').eq('artist', artistNameToDelete);
      if (remainingSongs && remainingSongs.length === 0) {
        await supabase.from('artists').delete().eq('name', artistNameToDelete);
        setArtistList(prev => prev.filter(name => name !== artistNameToDelete));
      }
    }
    refreshSongs();
  };

  const handleUploadWithArtist = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');
    if (!songImage || !songUrl || !songName || !artistName) {
      setError('Please provide all fields.');
      setUploading(false);
      return;
    }
    const validateImageDimensions = (file) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = function() {
          if (img.width === img.height) {
            resolve(true);
          } else {
            reject(new Error('Song image width x height must be equal.'));
          }
        };
        img.onerror = function() {
          reject(new Error('Invalid image file.'));
        };
        img.src = URL.createObjectURL(file);
      });
    };
    try {
      await validateImageDimensions(songImage);
    } catch (err) {
      alert(err.message);
      setError(err.message);
      setUploading(false);
      return;
    }
    const { data: existing } = await supabase.from('songs').select('*').eq('url', songUrl);
    if (existing && existing.length > 0) {
      setError('Music already exists with this URL. Redirecting to music list...');
      setUploading(false);
      setTimeout(() => {
        navigate('/music', { state: { highlightUrl: songUrl } });
      }, 1200);
      return;
    }
    let thumbnailUrl = '';
    try {
      thumbnailUrl = await uploadFileAndGetURL(songImage, 'music', `thumbnails/${Date.now()}_${songImage.name}`);
    } catch (err) {
      setError('Failed to upload song image.');
      setUploading(false);
      return;
    }
    let artistPhotoUrl = '';
    if (artistPhoto) {
      try {
        artistPhotoUrl = await uploadFileAndGetURL(artistPhoto, 'artist-photos', `${Date.now()}_${artistPhoto.name}`);
        const { data: artistExists } = await supabase.from('artists').select('name').eq('name', artistName);
        if (artistExists && artistExists.length > 0) {
          await supabase.from('artists').update({ photo: artistPhotoUrl }).eq('name', artistName);
        } else {
          await supabase.from('artists').insert([{ name: artistName, photo: artistPhotoUrl }]);
        }
      } catch (err) {
        setError('Failed to upload artist photo.');
        setUploading(false);
        return;
      }
    } else {
      const { data: artistData } = await supabase.from('artists').select('photo').eq('name', artistName).single();
      if (artistData && artistData.photo) {
        artistPhotoUrl = artistData.photo;
      } else {
        artistPhotoUrl = thumbnailUrl;
        const { data: artistExists } = await supabase.from('artists').select('name').eq('name', artistName);
        if (!artistExists || artistExists.length === 0) {
          await supabase.from('artists').insert([{ name: artistName, photo: artistPhotoUrl }]);
        }
      }
    }
    await supabase.from('songs').insert([
      {
        title: songName,
        artist: artistName,
        thumbnail: thumbnailUrl,
        url: songUrl
      }
    ]);
    if (!artistList.includes(artistName)) {
      setArtistList(prev => [...prev, artistName]);
    }
    setSuccess('Song uploaded!');
    setSongImage(null);
    setArtistPhoto(null);
    setSongUrl('');
    setSongName('');
    setArtistName('');
    setUploading(false);
    await refreshSongs();
  };

  const handleUpdatePlatformLink = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');
    
    const platformName = e.target.platformName.value;
    const platformLink = e.target.platformLink.value;
    
    if (!platformName) {
      setError('Platform name is required.');
      setUploading(false);
      return;
    }
    
    try {
      // First check if platform exists - use .maybeSingle() or check array length
      const { data: existingPlatform, error: fetchError } = await supabase
        .from('platforms')
        .select('id')
        .eq('name', platformName);
      
      if (fetchError) {
        console.error('Error checking platform:', fetchError);
        throw fetchError;
      }
      
      if (existingPlatform && existingPlatform.length > 0) {
        // Update existing platform
        const { error: updateError } = await supabase
          .from('platforms')
          .update({ link: platformLink })
          .eq('name', platformName);
        
        if (updateError) {
          console.error('Error updating platform:', updateError);
          throw updateError;
        }
        console.log('Platform updated successfully');
      } else {
        // Insert new platform
        const { error: insertError } = await supabase
          .from('platforms')
          .insert([{ name: platformName, link: platformLink }]);
        
        if (insertError) {
          console.error('Error inserting platform:', insertError);
          throw insertError;
        }
        console.log('Platform inserted successfully');
      }
      
      // Update local state
      setPlatformLinks(prev => ({
        ...prev,
        [platformName]: platformLink
      }));
      
      setSuccess('Platform link updated successfully!');
      setEditPlatformName(null);
    } catch (err) {
      console.error('Error in handleUpdatePlatformLink:', err);
      setError('Failed to update platform link: ' + err.message);
    }
    
    setUploading(false);
  };

  if (!authed) {
    return (
      <>
        <Header />
        <div className="admin-login-bg">
          <div className="admin-login-box">
            <div style={{textAlign:'center',marginBottom:'12px',color:'#2a5d9f',fontWeight:'bold'}}>Official Rasila Infotainment Admin Panel</div>
            <h2 className="admin-login-title">Admin Login</h2>
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="admin-secret-field">
                <input
                  type={showSecret ? 'text' : 'password'}
                  placeholder="enter secret code"
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                  className="admin-login-input"
                  autoComplete="off"
                />
                <span
                  className="admin-eye-icon"
                  onClick={() => setShowSecret(s => !s)}
                  tabIndex={0}
                  aria-label={showSecret ? 'Hide code' : 'Show code'}
                >
                  {showSecret ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l22 22"/><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7 19 2.73 15.11 1 12c.74-1.32 1.81-2.87 3.08-4.13M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .39-.08.76-.21 1.1"/><path d="M21 21L3 3"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </span>
              </div>
              <button type="submit" className="admin-login-btn">Login</button>
            </form>
            {error && <p className="admin-login-error">{error}</p>}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!option) {
    return (
      <>
        <Header />
        <div className="admin-panel-container">
          <div className="admin-panel-header">
            <h2>Admin Panel</h2>
            <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
          </div>
          <div className="admin-panel-options">
            <div onClick={()=>setOption('add')} className="admin-panel-option">
              <div className="admin-panel-option-icon">🎵</div>
              <div className="admin-panel-option-label">Add Music</div>
            </div>
            <div onClick={()=>setOption('update')} className="admin-panel-option">
              <div className="admin-panel-option-icon">✏️</div>
              <div className="admin-panel-option-label">Update Music</div>
            </div>
            <div onClick={()=>setOption('platforms')} className="admin-panel-option">
              <div className="admin-panel-option-icon">🔗</div>
              <div className="admin-panel-option-label">Update Platform Link</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (option === 'add') {
    return (
      <>
        <Header />
        <div className="admin-add-container">
          <button onClick={()=>setOption(null)} className="admin-back-btn">&larr; Back</button>
          <h2>Upload New Song</h2>
          <form onSubmit={handleUploadWithArtist}>
            <div className="admin-form-group">
              <label>Song Name: </label>
              <input type="text" value={songName} onChange={e => setSongName(e.target.value)} className="admin-input" placeholder="Song Name" />
            </div>
            <div className="admin-form-group admin-artist-group">
              <label>Artist Name: </label>
              <input
                type="text"
                value={artistName}
                onChange={e => {
                  setArtistName(e.target.value);
                  if (e.target.value.length > 0) setShowDropdown(true);
                  else setShowDropdown(false);
                }}
                onFocus={() => { if (artistName.length > 0) setShowDropdown(true); }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="admin-input"
                placeholder="Artist Name"
                autoComplete="off"
              />
              {showDropdown && artistList.length > 0 && (
                <div className="admin-dropdown">
                  {artistList.filter(name => name.toLowerCase().includes(artistName.toLowerCase()) && name !== artistName).map((name, idx) => (
                    <div
                      key={name+idx}
                      className="admin-dropdown-item"
                      onMouseDown={() => {
                        setArtistName(name);
                        setShowDropdown(false);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                  {artistList.filter(name => name.toLowerCase().includes(artistName.toLowerCase()) && name !== artistName).length === 0 && (
                    <div className="admin-dropdown-no-match">No match. New artist will be added.</div>
                  )}
                </div>
              )}
            </div>
            <div className="admin-form-group">
              <label>Artist Photo (optional): </label>
              <input type="file" accept="image/*" onChange={handleArtistPhotoChange} />
            </div>
            <div className="admin-form-group">
              <label>Song Image: </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="admin-form-group">
              <label>Song URL: </label>
              <input type="text" value={songUrl} onChange={e => setSongUrl(e.target.value)} className="admin-input" placeholder="https://..." />
            </div>
            <button type="submit" disabled={uploading} className="admin-upload-btn">Upload</button>
          </form>
          {uploading && (
            <div className="admin-uploading-spinner" style={{marginTop:'16px'}}>
              <svg width="36" height="36" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#2a5d9f" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" transform="rotate(-90 25 25)">
                  <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div style={{color:'#2a5d9f',marginTop:'8px',fontWeight:'bold'}}>Uploading...</div>
            </div>
          )}
          {error && <p className="admin-error-msg">{error}</p>}
          {success && <p className="admin-success-msg">{success}</p>}
        </div>
        <Footer />
      </>
    );
  }

  if (option === 'update') {
    return (
      <>
        <Header />
        <div className="admin-update-container">
          <button onClick={()=>setOption(null)} className="admin-back-btn">&larr; Back</button>
          <h2>Update Music</h2>
          {loadingSongs ? (
            <p className="admin-loading-msg">Loading songs...</p>
          ) : songs.length === 0 ? (
            <p className="admin-loading-msg">No uploaded songs yet.</p>
          ) : (
            <div className="admin-song-list">
              {songs.map((song) => (
                <div key={song.id} className="admin-song-item">
                  <img src={song.thumbnail} alt={song.title} className="admin-song-thumb" />
                  <div className="admin-song-info">
                    <div className="admin-song-title">{song.title}</div>
                    <div className="admin-song-artist">{song.artist}</div>
                  </div>
                  <button onClick={() => setEditSong(song)} className="admin-edit-btn" title="Edit">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00cfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          {editSong && (
            <div className="admin-edit-modal-bg">
              <div className="admin-edit-modal">
                <h3>Edit Song</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setUploading(true);
                  setError('');
                  let newThumbnailUrl = editSong.thumbnail;
                  let newArtistPhotoUrl = null;
                  if (e.target.thumbnail.files && e.target.thumbnail.files[0]) {
                    try {
                      newThumbnailUrl = await uploadFileAndGetURL(e.target.thumbnail.files[0], 'music', `thumbnails/${Date.now()}_${e.target.thumbnail.files[0].name}`);
                    } catch (err) {
                      setError('Failed to upload new thumbnail.');
                      setUploading(false);
                      return;
                    }
                  }
                  if (e.target.artistPhoto.files && e.target.artistPhoto.files[0]) {
                    try {
                      newArtistPhotoUrl = await uploadFileAndGetURL(e.target.artistPhoto.files[0], 'artist-photos', `${Date.now()}_${e.target.artistPhoto.files[0].name}`);
                      const newArtistName = e.target.artist.value;
                      const { data: artistExists } = await supabase.from('artists').select('name').eq('name', newArtistName);
                      if (artistExists && artistExists.length > 0) {
                        await supabase.from('artists').update({ photo: newArtistPhotoUrl }).eq('name', newArtistName);
                      } else {
                        await supabase.from('artists').insert([{ name: newArtistName, photo: newArtistPhotoUrl }]);
                      }
                    } catch (err) {
                      setError('Failed to upload new artist photo.');
                      setUploading(false);
                      return;
                    }
                  }
                  const newArtistName = e.target.artist.value;
                  const { error: updateError } = await supabase.from('songs').update({
                    title: e.target.title.value,
                    artist: newArtistName,
                    thumbnail: newThumbnailUrl,
                    url: e.target.url.value
                  }).eq('id', editSong.id);
                  if (updateError) {
                    setError('Failed to update song.');
                    setUploading(false);
                    return;
                  }
                  if (editSong.artist !== newArtistName || newArtistPhotoUrl) {
                    const { data: oldArtistSongs } = await supabase.from('songs').select('id').eq('artist', editSong.artist);
                    if (oldArtistSongs && oldArtistSongs.length === 0) {
                      await supabase.from('artists').delete().eq('name', editSong.artist);
                    }
                    const { data: newArtistExists } = await supabase.from('artists').select('name').eq('name', newArtistName);
                    if (!newArtistExists || newArtistExists.length === 0) {
                      await supabase.from('artists').insert([{ name: newArtistName, photo: newArtistPhotoUrl || newThumbnailUrl }]);
                    } else if (newArtistPhotoUrl) {
                      await supabase.from('artists').update({ photo: newArtistPhotoUrl }).eq('name', newArtistName);
                    }
                  }
                  setSuccess('Song updated!');
                  setEditSong(null);
                  setUploading(false);
                  await refreshSongs();
                  const { data: updatedArtists } = await supabase.from('artists').select('name');
                  if (updatedArtists) {
                    setArtistList(updatedArtists.map(a => a.name));
                  }
                }}>
                  <div className="admin-form-group">
                    <label>Song Name: </label>
                    <input type="text" name="title" defaultValue={editSong.title} className="admin-input" />
                  </div>
                  <div className="admin-form-group">
                    <label>Artist Name: </label>
                    <input type="text" name="artist" defaultValue={editSong.artist} className="admin-input" />
                  </div>
                  <div className="admin-form-group">
                    <label>Artist Photo (optional): </label>
                    <input type="file" name="artistPhoto" accept="image/*" />
                  </div>
                  <div className="admin-form-group">
                    <label>Thumbnail: </label>
                    <input type="file" name="thumbnail" accept="image/*" />
                    <img src={editSong.thumbnail} alt="Current Thumbnail" className="admin-edit-thumb" />
                  </div>
                  <div className="admin-form-group">
                    <label>Song URL: </label>
                    <input type="text" name="url" defaultValue={editSong.url} className="admin-input" />
                  </div>
                  <button type="submit" disabled={uploading} className="admin-save-btn">Save</button>
                  <button type="button" onClick={()=>setEditSong(null)} className="admin-cancel-btn">Cancel</button>
                  <button type="button" onClick={async()=>{
                    if(window.confirm('Delete this song?')){
                      setUploading(true);
                      await handleDelete(editSong.id);
                      setEditSong(null);
                      setUploading(false);
                    }
                  }} className="admin-delete-btn">Delete</button>
                  {error && <p className="admin-error-msg">{error}</p>}
                  {success && <p className="admin-success-msg">{success}</p>}
                </form>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }

  if (option === 'platforms') {
    return (
      <>
        <Header />
        <div className="admin-update-container">
          <button onClick={()=>setOption(null)} className="admin-back-btn">&larr; Back</button>
          <h2>Update Platform Links</h2>
          
          {editPlatformName ? (
            <div className="admin-edit-modal-bg">
              <div className="admin-edit-modal">
                <h3>Update Platform Link</h3>
                <form onSubmit={handleUpdatePlatformLink}>
                  <div className="admin-form-group">
                    <label>Platform Name: </label>
                    <input 
                      type="text" 
                      name="platformName" 
                      defaultValue={editPlatformName} 
                      className="admin-input"
                      readOnly 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Platform Link: </label>
                    <input 
                      type="text" 
                      name="platformLink" 
                      defaultValue={platformLinks[editPlatformName] || ''} 
                      className="admin-input"
                      placeholder="https://..."
                    />
                  </div>
                  <button type="submit" disabled={uploading} className="admin-save-btn">Save</button>
                  <button type="button" onClick={()=>setEditPlatformName(null)} className="admin-cancel-btn">Cancel</button>
                  {error && <p className="admin-error-msg">{error}</p>}
                  {success && <p className="admin-success-msg">{success}</p>}
                </form>
              </div>
            </div>
          ) : (
            <>
              {loadingPlatforms ? (
                <p className="admin-loading-msg">Loading platforms...</p>
              ) : (
                <div className="admin-song-list">
                  {Object.keys(logoMap).map((platformName) => (
                    <div key={platformName} className="admin-song-item">
                      <div className="admin-song-info">
                        <div className="admin-song-title">{platformName}</div>
                        <div className="admin-song-artist">{platformLinks[platformName] || '(No link set)'}</div>
                      </div>
                      <button onClick={() => setEditPlatformName(platformName)} className="admin-edit-btn" title="Edit">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00cfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
};

export default Admin;
