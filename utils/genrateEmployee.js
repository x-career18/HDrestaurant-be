function GenerateEmployeeCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); // Lấy 2 số cuối của năm
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và đảm bảo có 2 chữ số
    const day = currentDate.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Số ngẫu nhiên từ 000 đến 999

    const employeeCode = `${year}${month}${day}${randomDigits}`;
    return employeeCode;
}

export default GenerateEmployeeCode;