import React, { useState, useEffect } from "react";
import { 
  FileText, Users, UserCheck, Edit2, MapPin, Calendar, 
  Link as LinkIcon, Save, X, User, Briefcase, Globe, Image as ImageIcon, Layout, Loader2
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState(null);
  
  // States specifically for file uploads
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // ==========================================
  // 1. FETCH REAL DATA ON LOAD
  // ==========================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          credentials: "include"
        });
        const data = await response.json();

        if (response.ok && data.success) {
          const dbUser = data.profile;
          // Format the raw database data into our beautiful UI structure
          const formattedProfile = {
            name: dbUser.name || "Unknown User",
            role: dbUser.role || "New Member",
            bio: dbUser.bio || "This user hasn't written a bio yet.",
            location: dbUser.location || "Earth",
            website: dbUser.website || "",
            joined: new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            
            // If they don't have an avatar in MongoDB, generate a cool abstract geometric shape based on their ID
            avatar: dbUser.avatar || `https://api.dicebear.com/8.x/shapes/svg?seed=${dbUser._id}&backgroundColor=e2e8f0`,
            
            // Default cover image if none uploaded
            coverImage: dbUser.coverImage || "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop",
            
            postsCount: dbUser.postsCount || 0,
            followersCount: dbUser.followers ? dbUser.followers.length : 0,
            followingCount: dbUser.following ? dbUser.following.length : 0,
          };

          setProfile(formattedProfile);
          setEditForm(formattedProfile);
        } else {
          setErrorMsg("Failed to load profile data.");
        }
      } catch (err) {
        setErrorMsg("Failed to connect to server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // 2. HANDLE INPUT CHANGES
  // ==========================================
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'avatar') {
      setAvatarFile(e.target.files[0]);
    } else if (e.target.name === 'coverImage') {
      setCoverFile(e.target.files[0]);
    }
  };

  // ==========================================
  // 3. SUBMIT TO BACKEND (TEXT + IMAGES)
  // ==========================================
  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg("");

    // FormData is required when sending files over the network!
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("role", editForm.role);
    formData.append("bio", editForm.bio);
    formData.append("location", editForm.location);
    formData.append("website", editForm.website);
    
    // Only append files if the user actually selected new ones
    if (avatarFile) formData.append("avatar", avatarFile);
    if (coverFile) formData.append("coverImage", coverFile);

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        body: formData,
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success! Reload the page to fetch the fresh Cloudinary URLs and updated text
        window.location.reload(); 
      } else {
        setErrorMsg(data.message || "Failed to save profile.");
        setIsSaving(false);
      }
    } catch (err) {
      setErrorMsg("Error connecting to server while saving.");
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setAvatarFile(null);
    setCoverFile(null);
    setIsEditing(false);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '15px' }}>
        <Loader2 className="animate-spin" size={40} color="#a855f7" />
        <h3 style={{ color: '#1e293b', fontFamily: 'Poppins' }}>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --text-main: #1e293b;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --bg-card: #ffffff;
          --primary-dark: #0f172a;
          --brand-gradient: linear-gradient(135deg, #4f46e5 0%, #a855f7 50%, #ec4899 100%);
          --brand-gradient-hover: linear-gradient(135deg, #4338ca 0%, #9333ea 50%, #db2777 100%);
          --ambient-glow: rgba(168, 85, 247, 0.15);
        }

        .profile-container { padding: 0 20px 60px 20px; font-family: 'Poppins', sans-serif; max-width: 950px; margin: 0 auto; color: var(--text-main); }
        .profile-header-card { background: var(--bg-card); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08); margin-bottom: 40px; position: relative; }
        .cover-photo { height: 280px; background-size: cover; background-position: center; position: relative; transition: all 0.5s ease; }
        .cover-photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%); }
        .profile-info-section { padding: 0 40px 40px 40px; position: relative; }
        .profile-avatar-wrapper { display: flex; justify-content: space-between; align-items: flex-end; margin-top: -85px; margin-bottom: 24px; position: relative; z-index: 10; }
        .profile-img { width: 150px; height: 150px; border-radius: 50%; border: 6px solid var(--bg-card); object-fit: cover; box-shadow: 0 10px 30px var(--ambient-glow); background: white; transition: transform 0.3s ease; }
        .profile-img:hover { transform: scale(1.02); }
        .profile-name { font-size: 36px; font-weight: 800; color: var(--text-main); line-height: 1.1; letter-spacing: -1px; }
        .profile-role { font-size: 18px; font-weight: 700; margin-top: 4px; margin-bottom: 16px; background: var(--brand-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; }
        .profile-bio { font-size: 16px; color: #475569; line-height: 1.8; margin-bottom: 24px; max-width: 800px; }
        .profile-meta { display: flex; gap: 24px; color: var(--text-muted); font-size: 14px; margin-bottom: 10px; }
        .meta-item { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .meta-icon { color: #a855f7; }

        /* Buttons */
        .btn { padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s; border: none; }
        .btn-edit { background: white; border: 2px solid #f1f5f9; color: var(--text-main); }
        .btn-edit:hover { border-color: #e2e8f0; transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.05); }
        .btn-primary { background: var(--brand-gradient); color: white; box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3); }
        .btn-primary:hover:not(:disabled) { background: var(--brand-gradient-hover); transform: translateY(-2px); box-shadow: 0 12px 25px rgba(168, 85, 247, 0.4); }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-cancel { background: #f1f5f9; color: #64748b; }
        .btn-cancel:hover { background: #e2e8f0; color: #334155; }

        /* Custom File Upload Button Styles */
        .file-upload-label { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border: 2px dashed #cbd5e1; border-radius: 12px; background: rgba(255,255,255,0.5); cursor: pointer; font-weight: 600; color: var(--text-muted); transition: all 0.2s; }
        .file-upload-label:hover { border-color: #a855f7; color: #a855f7; background: white; }
        .file-input-hidden { display: none; }
        .file-name-badge { margin-top: 8px; font-size: 12px; color: #a855f7; font-weight: 600; background: rgba(168, 85, 247, 0.1); padding: 4px 10px; border-radius: 20px; display: inline-block;}

        /* Edit Form */
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .edit-form-container { background: linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%); backdrop-filter: blur(20px); border-radius: 20px; padding: 35px; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 20px 40px var(--ambient-glow); margin-top: 30px; position: relative; overflow: hidden; animation: slideUpFade 0.5s forwards; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 30px; position: relative; z-index: 1; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full-width { grid-column: span 2; }
        .form-label { font-size: 13px; font-weight: 700; color: var(--text-main); text-transform: uppercase; letter-spacing: 0.8px; }
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 16px; color: #94a3b8; transition: color 0.3s; }
        .form-input, .form-textarea { width: 100%; padding: 16px 16px 16px 48px; border: 2px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 15px; color: var(--text-main); background: rgba(255, 255, 255, 0.7); transition: all 0.3s; }
        .form-textarea { resize: vertical; min-height: 120px; padding: 16px; }
        .form-input:focus, .form-textarea:focus { outline: none; border-color: #a855f7; background: #ffffff; box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.15); transform: translateY(-1px); }
        .form-input:focus + .input-icon, .input-wrapper:focus-within .input-icon { color: #a855f7; }
        .form-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 24px; border-top: 1px solid rgba(226, 232, 240, 0.6); position: relative; z-index: 1; }
        
        /* Error Banner */
        .error-banner { background: #fee2e2; color: #ef4444; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 14px; text-align: center; margin-bottom: 20px; border: 1px solid #fca5a5; }

        /* Metrics */
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .metric-card { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid rgba(226, 232, 240, 0.8); display: flex; align-items: center; gap: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: all 0.4s; }
        .metric-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.3); }
        .metric-icon-wrapper { width: 64px; height: 64px; border-radius: 18px; display: flex; justify-content: center; align-items: center; }
        .icon-blue { background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); color: #4338ca; }
        .icon-pink { background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); color: #be185d; }
        .icon-teal { background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%); color: #0f766e; }
        .metric-value { font-size: 32px; font-weight: 800; color: var(--text-main); line-height: 1; margin-bottom: 8px; letter-spacing: -0.5px; }
        .metric-label { font-size: 15px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        
        /* Utility */
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="profile-container">

        <div className="profile-header-card">
          <div className="cover-photo" style={{ backgroundImage: `url(${profile.coverImage})` }}></div>
          
          <div className="profile-info-section">
            <div className="profile-avatar-wrapper">
              <img src={profile.avatar} alt="profile" className="profile-img" />
              
              {!isEditing && (
                <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} /> Edit Profile
                </button>
              )}
            </div>

            {/* STATIC VIEW */}
            {!isEditing && (
              <div>
                <h1 className="profile-name">{profile.name}</h1>
                <div className="profile-role">{profile.role}</div>
                <p className="profile-bio">{profile.bio}</p>
                
                <div className="profile-meta">
                  <div className="meta-item"><MapPin size={18} className="meta-icon" /> {profile.location}</div>
                  {profile.website && (
                    <div className="meta-item"><LinkIcon size={18} className="meta-icon" /> {profile.website}</div>
                  )}
                  <div className="meta-item"><Calendar size={18} className="meta-icon" /> Joined {profile.joined}</div>
                </div>
              </div>
            )}

            {/* EDITING VIEW */}
            {isEditing && (
              <div className="edit-form-container">
                {errorMsg && <div className="error-banner">{errorMsg}</div>}
                
                <div className="form-grid">
                  
                  <div className="form-group">
                    <label className="form-label">Display Name</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Professional Role</label>
                    <div className="input-wrapper">
                      <Briefcase size={20} className="input-icon" />
                      <input type="text" name="role" value={editForm.role} onChange={handleEditChange} className="form-input" />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Biography</label>
                    <textarea name="bio" value={editForm.bio} onChange={handleEditChange} className="form-textarea" placeholder="Tell the world about yourself..." />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <div className="input-wrapper">
                      <MapPin size={20} className="input-icon" />
                      <input type="text" name="location" value={editForm.location} onChange={handleEditChange} className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <div className="input-wrapper">
                      <Globe size={20} className="input-icon" />
                      <input type="text" name="website" value={editForm.website} onChange={handleEditChange} className="form-input" placeholder="www.yourwebsite.com" />
                    </div>
                  </div>

                  {/* PREMIUM FILE UPLOADERS */}
                  <div className="form-group">
                    <label className="form-label">Profile Avatar</label>
                    <label className="file-upload-label">
                      <ImageIcon size={20} /> Choose Image
                      <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="file-input-hidden" />
                    </label>
                    {avatarFile && <span className="file-name-badge">Ready: {avatarFile.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Banner</label>
                    <label className="file-upload-label">
                      <Layout size={20} /> Choose Banner
                      <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} className="file-input-hidden" />
                    </label>
                    {coverFile && <span className="file-name-badge">Ready: {coverFile.name}</span>}
                  </div>

                </div>
                
                <div className="form-actions">
                  <button className="btn btn-cancel" onClick={handleCancel} disabled={isSaving}>
                    <X size={18} /> Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                    {isSaving ? "Uploading to Cloud..." : "Save Profile"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- METRICS --- */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-wrapper icon-blue">
              <FileText size={28} strokeWidth={2.5} />
            </div>
            <div>
              <div className="metric-value">{profile.postsCount}</div>
              <div className="metric-label">Posts</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper icon-pink">
              <Users size={28} strokeWidth={2.5} />
            </div>
            <div>
              <div className="metric-value">{profile.followersCount}</div>
              <div className="metric-label">Followers</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper icon-teal">
              <UserCheck size={28} strokeWidth={2.5} />
            </div>
            <div>
              <div className="metric-value">{profile.followingCount}</div>
              <div className="metric-label">Following</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}