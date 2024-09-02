import React from 'react';

const PaymentPage = ({ selectedNurse }) => {
    if (!selectedNurse) {
        return <p>لطفا یک پرستار را انتخاب کنید تا به صفحه پرداخت هدایت شوید.</p>;
    }

    const handlePayment = () => {
        // اینجا می‌توانید کارهای مربوط به پردازش پرداخت یا هدایت به درگاه پرداخت را انجام دهید
        console.log(`پرداخت برای ${selectedNurse.name} انجام شد.`);
        // مثلا هدایت به صفحه درگاه پرداخت:
        window.location.href = 'https://example-payment-gateway.com';
    };

    return (
        <div style={paymentContainerStyle}>
            <h2>صفحه پرداخت</h2>
            <div style={nurseInfoStyle}>
                <h3>اطلاعات پرستار انتخاب شده:</h3>
                <p><strong>نام:</strong> {selectedNurse.name}</p>
                <p><strong>تخصص:</strong> {selectedNurse.specialization}</p>
                <p><strong>امتیاز:</strong> {selectedNurse.rating}</p>
                <p><strong>هزینه خدمات:</strong> ۲۰۰,۰۰۰ تومان</p>
            </div>
            <button onClick={handlePayment} style={payButtonStyle}>پرداخت</button>
        </div>
    );
};

const paymentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
};

const nurseInfoStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
};

const payButtonStyle = {
    padding: '15px 30px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default PaymentPage;
