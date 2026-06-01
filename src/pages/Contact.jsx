import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    let tempErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Vui lòng nhập họ và tên';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Vui lòng nhập email hợp lệ';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Địa chỉ email không hợp lệ';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Nội dung lời nhắn không được để trống';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Clear form
        setFormData({ name: '', email: '', interest: '', message: '' });
      }, 1000);
    }
  };

  return (
    <div className="pt-20">
      <main className="py-12 md:py-16 text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Hero Header */}
          <header className="mb-stack-lg max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
              Cùng kiến tạo tương lai của bạn
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Bạn có câu hỏi về luyện thi IELTS hay tư vấn du học? Các cố vấn học thuật của chúng tôi luôn sẵn sàng hỗ trợ bạn đi tới thành công.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Contact Form Section (Bento Style) */}
            <div className="lg:col-span-8 space-y-gutter">
              {!isSubmitted ? (
                <section className="bg-surface-container-lowest p-6 md:p-10 rounded-xl border border-outline-variant/30 tonal-elevation-1">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-gutter" noValidate>
                    {/* Full Name */}
                    <div className="flex flex-col space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold" htmlFor="name">
                        Họ và tên
                      </label>
                      <input
                        className={`w-full px-4 py-3 bg-surface-container rounded-lg border ${
                          errors.name ? 'border-error focus:ring-error focus:border-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        } focus:ring-1 outline-none transition-all`}
                        id="name"
                        name="name"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        type="text"
                      />
                      {errors.name && (
                        <span className="text-error text-label-md mt-1 font-semibold">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold" htmlFor="email">
                        Địa chỉ Email
                      </label>
                      <input
                        className={`w-full px-4 py-3 bg-surface-container rounded-lg border ${
                          errors.email ? 'border-error focus:ring-error focus:border-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        } focus:ring-1 outline-none transition-all`}
                        id="email"
                        name="email"
                        placeholder="nguyenvana@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        type="email"
                      />
                      {errors.email && (
                        <span className="text-error text-label-md mt-1 font-semibold">{errors.email}</span>
                      )}
                    </div>

                    {/* Course Interest */}
                    <div className="md:col-span-2 flex flex-col space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold" htmlFor="interest">
                        Khóa học quan tâm
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                        >
                          <option value="">Lựa chọn chương trình</option>
                          <option value="ielts">Luyện thi IELTS Học thuật</option>
                          <option value="general">Tiếng Anh Giao tiếp Thành thạo</option>
                          <option value="placement">Tư vấn Du học & Tuyển sinh</option>
                          <option value="other">Yêu cầu khác</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                          <span className="material-symbols-outlined">arrow_drop_down</span>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 flex flex-col space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold" htmlFor="message">
                        Lời nhắn của bạn
                      </label>
                      <textarea
                        className={`w-full px-4 py-3 bg-surface-container rounded-lg border ${
                          errors.message ? 'border-error focus:ring-error focus:border-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        } focus:ring-1 outline-none transition-all resize-none`}
                        id="message"
                        name="message"
                        placeholder="Chia sẻ với chúng tôi về mục tiêu học tập của bạn..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                      />
                      {errors.message && (
                        <span className="text-error text-label-md mt-1 font-semibold">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                      <button
                        className={`w-full md:w-auto bg-secondary-container text-on-secondary-container px-12 py-4 rounded-lg font-headline-sm text-headline-sm hover:tonal-elevation-2 transition-all active:scale-95 duration-150 font-bold cursor-pointer ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                      </button>
                    </div>
                  </form>
                </section>
              ) : (
                /* Success Message Banner */
                <div className="bg-primary-container text-on-primary-container p-8 md:p-10 rounded-xl flex items-start gap-4 border border-primary/20 animate-fade-in">
                  <span className="material-symbols-outlined text-secondary-container text-4xl mt-1 font-bold">
                    check_circle
                  </span>
                  <div>
                    <p className="font-headline-sm font-bold text-on-primary">Đã nhận được yêu cầu tư vấn!</p>
                    <p className="font-body-md opacity-90 mt-2 text-primary-fixed-dim leading-relaxed">
                      Cảm ơn bạn đã liên hệ với Dream Education. Cố vấn học thuật của chúng tôi sẽ liên hệ lại với bạn qua email đã cung cấp trong vòng 24 giờ.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-label-md hover:brightness-110 active:scale-95 transition-all font-bold cursor-pointer"
                    >
                      Gửi lời nhắn khác
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            <aside className="lg:col-span-4 space-y-gutter w-full">
              {/* Contact Cards */}
              <div className="bg-primary text-on-primary p-6 rounded-xl tonal-elevation-1">
                <h3 className="font-headline-sm text-headline-sm mb-6 text-secondary-container font-bold">Liên hệ trực tiếp</h3>
                <div className="space-y-6">
                  <a className="flex items-center group transition-all" href="tel:+842838231234">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4 group-hover:bg-secondary-container transition-colors shrink-0">
                      <span className="material-symbols-outlined text-on-primary-container group-hover:text-on-secondary-container">call</span>
                    </div>
                    <div>
                      <p className="font-label-md opacity-70">Số điện thoại</p>
                      <p className="font-label-lg font-bold text-on-primary group-hover:text-secondary-container transition-colors">+84 28 3823 1234</p>
                    </div>
                  </a>
                  <a className="flex items-center group transition-all" href="mailto:admissions@dreamedu.vn">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4 group-hover:bg-secondary-container transition-colors shrink-0">
                      <span className="material-symbols-outlined text-on-primary-container group-hover:text-on-secondary-container">mail</span>
                    </div>
                    <div>
                      <p className="font-label-md opacity-70">Email</p>
                      <p className="font-label-lg font-bold text-on-primary group-hover:text-secondary-container transition-colors">admissions@dreamedu.vn</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Connections */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 tonal-elevation-1">
                <h3 className="font-headline-sm text-headline-sm mb-4 text-primary font-bold">Kết nối với chúng tôi</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-surface-container-low hover:bg-secondary-fixed/30 transition-colors group text-center"
                  >
                    <span className="material-symbols-outlined text-3xl mb-2 text-primary group-hover:scale-110 transition-transform">
                      social_leaderboard
                    </span>
                    <span className="font-label-md font-semibold text-on-surface">Facebook</span>
                  </a>
                  <a 
                    href="https://zalo.me" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-surface-container-low hover:bg-secondary-fixed/30 transition-colors group text-center"
                  >
                    <span className="material-symbols-outlined text-3xl mb-2 text-primary group-hover:scale-110 transition-transform">
                      chat
                    </span>
                    <span className="font-label-md font-semibold text-on-surface">Zalo</span>
                  </a>
                </div>
              </div>

              {/* Campus Location Preview */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 tonal-elevation-1 overflow-hidden relative group">
                <img
                  alt="Sảnh trung tâm"
                  className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0DSRioMEnKc3UZzdURnbAdmSbm7oTK4QgQqx7vmuR4wxpCmKGAFFXGo40joMtB7CooCKPSdqRpfIPHf6A-QbdDT8VgTEdgDQYa1BjsFDWK79lW1bD4k5ITgqkITzQ4cR-9-CykZEqMMY7XMIttlbEh5-_9ylDpQzEjKK415O7KYkC8Kk1-qqv_kGXBnUkZFjxXV09M6Qq3iT644iq3vML24SO3wQDql7f8eSkf6FyVdHYMUcdDFnnGC9xRq5__AOsLR_OpQPE1eg"
                />
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-2">location_on</span>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    123 Education Plaza, Quận 1,<br />Thành phố Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Map Section */}
          <section className="mt-stack-lg rounded-xl overflow-hidden border border-outline-variant/30 tonal-elevation-1 relative">
            <div className="h-[450px] bg-surface-container-high relative">
              <iframe
                title="Bản đồ Dream Education"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460232428345!2d106.7017555153561!3d10.776019392321557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f47444b023f%3A0x6a0c5c400494444!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1682345678901!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              {/* Overlay opening info card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-outline-variant/30 hidden md:block max-w-xs shadow-md">
                <h4 className="font-headline-sm text-primary font-bold mb-2">Cơ sở chính</h4>
                <p className="font-body-sm mb-4 text-on-surface-variant">Mở cửa Thứ Hai — Thứ Bảy: 8:00 sáng - 9:00 tối</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary font-label-lg flex items-center hover:translate-x-1 transition-transform font-bold"
                >
                  Chỉ đường
                  <span className="material-symbols-outlined ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
