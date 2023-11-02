import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
    fullname: Yup.string()
        .required('Họ và tên không được để trống'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email không được để trống'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu không được để trống'),
    phonenumber: Yup.string()
        .required('Số điện thoại không được để trống'),
});