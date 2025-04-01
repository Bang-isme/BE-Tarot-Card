/**
 * Tạo một middleware để xử lý try/catch cho các hàm async
 * @param {Function} fn - Hàm async cần bọc
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler; 