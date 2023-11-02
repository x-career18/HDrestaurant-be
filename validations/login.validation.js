import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email không được để trống'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu không được để trống'),
});