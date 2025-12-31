import React, { useEffect, useState, useRef } from 'react';
import styles from './wallet.module.css';
import axios from 'axios';
import logo from '../Home/logoBooker.png';

const RechargeForm = ({ onClose, onTransactionSuccess }) => {
    const [inputAmount, setInputAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [walletId, setWalletId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const intervalRef = useRef(null);
    const isSuccessRef = useRef(false); // CHỐNG CALL API VÔ HẠN

    /* ===================== INIT ===================== */
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            fetchWalletId(storedUser.id_tai_khoan);
        }
        return () => stopCheck();
    }, []);

    const fetchWalletId = async (userId) => {
        const res = await axios.get(`http://localhost:8080/api/v1/get-vi/${userId}`);
        setWalletId(res.data.id_vi);
    };

    /* ===================== INPUT ===================== */
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setInputAmount(value);
        setAmount(Number(value));
        setDisplayAmount(Number(value));

        setImgSrc(
            `https://apiqr.web2m.com/api/generate/VCB/1016710155/NGO%20VO%20BINH%20MINH?amount=${value}&memo=${walletId}`
        );
    };

    /* ===================== CREATE INVOICE ===================== */
    const handleCreateInvoice = () => {
        if (displayAmount < 1000) {
            setErrorMessage('Số tiền nạp tối thiểu 1.000đ');
            return;
        }
        setErrorMessage('');
        setIsInvoiceVisible(true);
    };

    const handleCloseInvoice = () => {
        setIsInvoiceVisible(false);
        startCheck();
    };

    /* ===================== CHECK TRANSACTION ===================== */
    const startCheck = () => {
        stopCheck();
        isSuccessRef.current = false;

        intervalRef.current = setInterval(async () => {
            if (isSuccessRef.current) return;

            try {
                const res = await axios.get(
                    `http://localhost:8080/api/v1/get-thanhtoan/${walletId}`
                );

                const data =
                    typeof res.data === 'string'
                        ? JSON.parse(res.data)
                        : res.data;

                const transactions = data.transactions || [];

                const matched = transactions.find(
                    (t) =>
                        t.type === 'IN' &&
                        t.description &&
                        t.description.includes(walletId)
                );

                if (matched) {
                    console.log('✅ NẠP TIỀN THÀNH CÔNG');

                    isSuccessRef.current = true;
                    stopCheck();

                    if (onTransactionSuccess) onTransactionSuccess();

                    window.dispatchEvent(
                        new CustomEvent('walletBalanceUpdated')
                    );

                    setTimeout(() => onClose(), 1200);
                }
            } catch (err) {
                console.error('Lỗi check giao dịch:', err);
            }
        }, 5000);
    };

    const stopCheck = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.modal1}>
                    <div className={styles.modalHeader}>
                        <h3>Nhập số tiền cần nạp</h3>
                        <button onClick={onClose} className={styles.closeButton}>X</button>
                    </div>
                    <div className={styles.modalContent}>
                        <input
                            type="text"
                            value={inputAmount}
                            onChange={handleInputChange}
                            placeholder="Nhập số tiền cần nạp"
                            className={styles.inputAmount}
                        />
                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <div className={styles.amountInfo}>
                            <div className={styles.amountLabel}>
                                <span>Số tiền cần thanh toán</span>
                                <span style={{ color: 'blue' }}>
                                    {displayAmount.toLocaleString()} đ
                                </span>
                            </div>
                            <div className={styles.amountLabel}>
                                <span>Số tiền nhận được</span>
                                <span style={{ color: 'red' }}>
                                    {displayAmount.toLocaleString()} đ
                                </span>
                            </div>
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelButton} onClick={onClose}>Đóng</button>
                            <button
                                className={styles.confirmButton}
                                onClick={handleCreateInvoice}
                            >
                                Tạo hóa đơn
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isInvoiceVisible && (
                <div className={styles.invoiceOverlay} onClick={handleCloseInvoice}>
                    <div className={styles.invoiceImageContainer} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.content}>
                            <div className={styles.info}>
                                <img src={logo} alt="Logo" />
                                <hr />
                                <div>
                                    <i className="fa-solid fa-building-columns"></i> Ngân hàng:
                                </div>
                                <span className={styles.bank} type="text">TCB</span>
                                <hr />
                                <div>
                                    <i className="fa-solid fa-credit-card"></i> Số tài khoản:
                                </div>
                                <span style={{ color: 'rgb(255, 204, 0)' }}>1016710155 </span>
                                <hr />
                                <div>
                                    <i className="fa-solid fa-user"></i> Chủ tài khoản:
                                </div>
                                <span>Ngô Võ Bình Minh</span>
                                <hr />
                                <div>
                                    <i className="fa-solid fa-money-bill"></i> Số tiền thanh toán:
                                </div>
                                <span style={{ color: 'rgb(134, 236, 50)' }}>
                                    {amount.toLocaleString('vi-VN') || 0} VND
                                </span>
                                <hr />
                                <div>
                                    <i className="fa-solid fa-message"></i> Nội dung chuyển khoản:
                                </div>
                                <span style={{ color: 'rgb(0, 251, 255)' }}>{walletId}</span>
                            </div>
                            <div className={styles.qrCode}>
                                <h3>QUÉT MÃ QR ĐỂ THANH TOÁN</h3>
                                <img src={imgSrc} alt="Hóa đơn QR" />
                                <div className={styles.footer}>
                                    Vui lòng xem kỹ nội dung trước khi chuyển khoản
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RechargeForm;
