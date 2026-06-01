import React from 'react';

const styles = {
  features: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    background: '#f3f4f6',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#2b9346',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: '4px',
  },
  featureDesc: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
};

function Features() {
  const features = [
    { id: 1, icon: 'fa-truck', title: 'Giao hàng nhanh', description: 'Trong 2h' },
    { id: 2, icon: 'fa-sync-alt', title: 'Đổi trả dễ dàng', description: 'Trong 7 ngày' },
    { id: 3, icon: 'fa-certificate', title: 'Sản phẩm chất lượng', description: 'Cam kết chính hãng' },
    { id: 4, icon: 'fa-shield-alt', title: 'Thanh toán an toàn', description: 'Bảo mật 100%' },
  ];

  return (
    <section style={styles.features}>
      {features.map((feature) => (
        <div key={feature.id} style={styles.featureItem}>
          <div style={styles.featureIcon}>
            <i className={`fas ${feature.icon}`}></i>
          </div>
          <div>
            <h4 style={styles.featureTitle}>{feature.title}</h4>
            <p style={styles.featureDesc}>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Features;