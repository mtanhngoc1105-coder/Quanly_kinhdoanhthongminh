import React, { useState, useEffect } from "react";
import useAuthStore from "../../stores/authStore";
import { FiUser, FiPhone, FiMapPin, FiSave, FiEdit2, FiMail } from "react-icons/fi";
import "../../assets/styles/profile.css";

function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    avatar: "/image/cart/avatar.png",
  });
  const [saveMessage, setSaveMessage] = useState("");

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setFormData({
          fullName: parsedUser.fullName || "",
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
          email: parsedUser.email || "",
          avatar: parsedUser.avatar || "/image/cart/avatar.png",
        });
      } catch (e) {
        console.error("Error loading user data:", e);
      }
    } else if (user) {
      setFormData({
        fullName: user.fullName || user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        email: user.email || "",
        avatar: user.avatar || "/image/cart/avatar.png",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.email.trim()) {
      setSaveMessage("Vui lòng điền đầy đủ thông tin!");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    setSaveMessage("Cập nhật thông tin thành công!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div style={styles.pageWrapper}>
      {saveMessage && (
        <div style={{...styles.alertBox, backgroundColor: saveMessage.includes("đầy đủ") ? "#ffebee" : "#e8f5e9"}}>
          <span style={{color: saveMessage.includes("đầy đủ") ? "#d32f2f" : "#2e7d32"}}>{saveMessage}</span>
        </div>
      )}

      <div style={styles.profileContainer}>
        <div style={styles.avatarSection}>
          <img src={formData.avatar} alt="Avatar" style={styles.avatarImage} />
        </div>

        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}><FiUser size={16} style={styles.labelIcon} /> Họ và tên</label>
            {isEditing ? (
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nhập họ và tên" style={styles.input} />
            ) : (
              <div style={styles.displayText}>{formData.fullName || "Chưa cập nhật"}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FiPhone size={16} style={styles.labelIcon} /> Số điện thoại</label>
            {isEditing ? (
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nhập số điện thoại" style={styles.input} />
            ) : (
              <div style={styles.displayText}>{formData.phone || "Chưa cập nhật"}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FiMapPin size={16} style={styles.labelIcon} /> Địa chỉ</label>
            {isEditing ? (
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Nhập địa chỉ chi tiết" style={{...styles.input, minHeight: "100px", resize: "vertical"}} />
            ) : (
              <div style={styles.displayText}>{formData.address || "Chưa cập nhật"}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FiMail size={16} style={styles.labelIcon} /> Email</label>
            {isEditing ? (
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Nhập địa chỉ Email" style={styles.input} />
            ) : (
              <div style={styles.displayText}>{formData.email || "Chưa cập nhật"}</div>
            )}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
              <FiEdit2 size={16} style={{marginRight: "8px"}} /> Chỉnh sửa thông tin
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={styles.saveBtn}>
                <FiSave size={16} style={{marginRight: "8px"}} /> Lưu thay đổi
              </button>
              <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                Hủy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "20px", fontFamily: "system-ui, sans-serif" },
  alertBox: { padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", fontWeight: "500" },
  profileContainer: { maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "12px", padding: "30px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
  avatarSection: { textAlign: "center", marginBottom: "30px", paddingBottom: "20px", borderBottom: "1px solid #f0f0f0" },
  avatarImage: { width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid #2e7d32" },
  formSection: { marginBottom: "30px" },
  formGroup: { marginBottom: "20px" },
  label: { display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" },
  labelIcon: { marginRight: "8px", color: "#2e7d32" },
  input: { width: "100%", padding: "12px 14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" },
  displayText: { padding: "12px 14px", backgroundColor: "#f8f9fa", borderRadius: "8px", fontSize: "14px", color: "#555", minHeight: "44px", display: "flex", alignItems: "center" },
  buttonGroup: { display: "flex", gap: "12px", marginTop: "30px" },
  editBtn: { flex: 1, padding: "12px 20px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" },
  saveBtn: { flex: 1, padding: "12px 20px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" },
  cancelBtn: { flex: 1, padding: "12px 20px", backgroundColor: "#f5f5f5", color: "#666", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease" },
};

export default ProfilePage;