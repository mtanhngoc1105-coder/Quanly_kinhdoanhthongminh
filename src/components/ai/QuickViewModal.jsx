import React from "react";

export default function QuickViewModal({ open = false, onClose = () => {}, product = null }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Quick View</h3>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 h-48 flex items-center justify-center">Image</div>
          <div>
            <h4 className="font-semibold">{product?.name ?? "Product name"}</h4>
            <p className="text-sm text-slate-600">{product?.description ?? "Short description"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={product.image}
          alt={product.name}
          width="200"
        />

        <h2>{product.name}</h2>

        <p>{product.price}đ</p>

        <button onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default QuickViewModal;