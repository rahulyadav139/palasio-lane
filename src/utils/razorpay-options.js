export const razorPayOption = {
  key: process.env.REACT_APP_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
  amount: '0', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: 'INR',
  name: 'Palasio Lane',
  description: 'Test Transaction',
  //   image: 'https://example.com/your_logo',
  order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  callback_url: 'https://palasio-lane.netlify.com/',
  prefill: {
    name: 'Gaurav Kumar',
    email: 'gaurav.kumar@example.com',
    contact: '9999999999',
  },
  notes: {
    address: 'Razorpay Corporate Office',
  },
  theme: {
    color: '#3399cc',
  },
};
