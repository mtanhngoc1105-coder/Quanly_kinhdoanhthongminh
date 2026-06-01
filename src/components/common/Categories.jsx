import React from 'react';


const styles = {
  categories: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '20px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '16px',
  },
  categoryCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px 12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '140px',
  },
  categoryImage: {
    width: '100%',
    flex: 1,
    minHeight: 0,
    margin: '0 auto 8px',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryName: {
    fontSize: '12px',
    color: '#374151',
    fontWeight: 500,
    margin: 0,
  },
};

function Categories() {
  const categories = [
    {
      id: 'ngu-coc',
      name: 'Ngũ cốc',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'banh-mi',
      name: 'Bánh mì',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'sua-trung',
      name: 'Sữa & Trứng',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'thit',
      name: 'Thịt',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'hai-san',
      name: 'Hải sản',
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'rau-cu',
      name: 'Rau củ',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'trai-cay',
      name: 'Trái cây',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=150',
    },
  ];

  return (
    <section style={styles.categories}>
      <h3 style={styles.title}>Danh mục nổi bật</h3>
      <div style={styles.categoryGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={styles.categoryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.categoryImage}>
              <img src={category.image} alt={category.name} style={styles.categoryImg} />
            </div>
            <p style={styles.categoryName}>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;