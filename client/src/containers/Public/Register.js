// src/containers/Public/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Đăng ký</h1>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-purple-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-purple-700"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-purple-700"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-purple-700"
          required
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label>
            Tôi đồng ý với <a href="hellio" className="text-orange-400">Điều khoản dịch vụ</a> và <a href="hellio" className="text-orange-400">Chính sách bảo mật</a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 p-3 rounded-lg hover:bg-orange-600"
        >
          Đăng ký
        </button>
        <div className="text-center mt-4">
          <p>Đã có tài khoản? <a href="hellio" className="text-orange-400">Đăng nhập</a></p>
          <p className="mt-2">Hoặc đăng ký với</p>
          <div className="flex justify-center mt-2">
            <button className="bg-blue-600 p-2 rounded-full mx-2">Facebook</button>
            <button className="bg-red-600 p-2 rounded-full mx-2">Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;