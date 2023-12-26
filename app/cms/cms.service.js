const db = require('_helpers/db');
const Cms = db.Cms;
const Support = db.Support;
const Payments = db.Payments;
const Commission = db.Commission;
const stripe = require("stripe")("sk_test_51LkO7ZSEqsfo8zmaMsDGmIdfP0JoqaljtCz3EpWQPMnUgZAOKkE435UJvqOjDNQl4rxEHVY0GrgPwhS1AWgblmyR00O64jPXce"); 
const paypal = require('paypal-rest-sdk');
const Razorpay = require('razorpay');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Abq0_e_hk1g-aHt3Mo5nSdgKqChXzAV6s6Cx2yMQgEog36gk3_3lDrVZWnIsQYjorJzxcrZu8JSx-4bp',
  'client_secret': 'ECaBApJzztr3I9MZ6P5CnMLAG-GUHBWpj6i_UF4STeJmAEVLu-tjh-AR4ebZYChVkt82qawhqPCxmdfS'
});

module.exports = {
    createCMS,
    getAllCMS,
    getCMSById,
    deleteCMS,
    updateCMS,
    createCommission,
    getAllCommission,
    getCommissionById,
    deleteCommission,
    updateCommission,
    createSupport,
    getAllSupport,
    getSupportById,
    deleteSupport,
    updateSupport,
    payment,
    paypals,
    allPayments,
    savePayment,
    getAllPayments,
    getPaymentById,
    deletePayment,
};

async function createCMS(contents) {
    const cms = new Cms(contents);
    await cms.save();
    return { success: true, message: "CMS Added Successfully" };
}

async function getAllCMS() {
    return await Cms.find().select('-hash');
}

async function getCMSById(id) {
    const cms = await Cms.findById(id).select('-hash').lean();
    if (!cms)
        return { error: true, message: "CMS not found" };
    // const stats = await Cms.findOne({ _id: id }).lean();
    return { success: true, cms };
}

async function deleteCMS(id) {
    await Cms.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateCMS(data) {
    // console.log(id);
    const cms = await Cms.findById(data.id);
    // validate
    if (cms) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cms[x] =  data.new[x]
        })
        await cms.save();
    }
}

async function createCommission(contents) {
  const commission = new Commission(contents);
  await commission.save();
  return { success: true, message: "Commission Added Successfully" };
}

async function getAllCommission() {
  return await Commission.find().select('-hash');
}

async function getCommissionById(id) {
  const commission = await Commission.findById(id).select('-hash').lean();
  if (!commission)
      return { error: true, message: "Commission not found" };
  else
  return { success: true, commission };
}

async function deleteCommission(id) {
  await Commission.findByIdAndRemove(id);
  return { success: true, message:"Successfully Deleted" };
}

async function updateCommission(data) {
  // console.log(id);
  const commission = await Commission.findById(data.id);
  // validate
  if (commission) {
      let keys = Object.keys(data.new)
      keys.map(x=>{
          commission[x] =  data.new[x]
      })
      await commission.save();
  }
}

async function updateCMSById(data) {
    // console.log(id);
    const cms = await Cms.findById(data.id);
    
    // validate
    if (cms) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cms[x] =  data.new[x]
        })
        await cms.save();
    }
}

async function createSupport(contents) {
    const support = new Support(contents);
    await support.save();
    return { success: true, message: "Support Added Successfully" };
}

async function getAllSupport() {
    return await Support.find().select('-hash');
}

async function getSupportById(id) {
    const support = await Support.findById(id).select('-hash').lean();
    if (!support)
        return { error: true, message: "Support not found" };
    const stats = await Support.findOne({ _id: id }).lean();
    return { success: true, support: { ...support, ...stats } };
}

async function deleteSupport(id) {
    await Support.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSupport(data) {
    // console.log(id);
    const support = await Support.findById(data.id);
    // validate
    if (support) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            support[x] =  data.new[x]
        })
        await support.save();
    }
}

async function payment(data) {
    console.log(data.name,"DDDDDDDDDDDD");
    const comm = await Commission.find().select('-hash')
    var price1 = (data.price / 100) * comm[0].value
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
      line_items: [
        {
          price_data: { 
            currency: "inr", 
            product_data: { 
              name: data.name, 
            }, 
            unit_amount: (data.price-price1)*100, 
          }, 
          quantity: data.quantity,
        }, 
        {
          price_data: { 
            currency: "inr",
            product_data: {
              name: data.name+" Commission", 
            },
            unit_amount: price1*100,
          },
          quantity: data.quantity,
        },
      ],
      mode: "payment",
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: 'Invoice for Product X'+" "+data.email,
          metadata: {
            order: 'order-xyz',
          },
          custom_fields: [
            {
              name: 'Purchase Order',
              value: 'PO-XYZ',
            },
          ],
          rendering_options: {
            amount_tax_display: 'include_inclusive_tax',
          },
          footer: 'B2B Inc.',
        },
      },
      // billing_details: {
      //   address: {
      //     city: "Madurai",
      //     country: "IN",
      //     line1: "",
      //     line2: "",
      //     postal_code: "600017",
      //     state: "Tamilnadu"
      //   },
      //   email: data.email,
      //   name: "Palvin",
      //   phone: "+919876543210"
      // },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    console.log(session,"SSSSSSSSSSSSSSSSSss");
    // if()
    return { success: true, session };
}

async function savePayment(data) {
  const payments = new Payments(data);
  await payments.save();
  return { success: true, message: "Payment Saved Successfully" };
}

async function getAllPayments() {
  return await Payments.find().select('-hash');
}

async function getPaymentById(id) {
  const payment = await Payments.findById(id).select('-hash').lean();
  if (!payment)
  return { error: true, message: "Payment not found" };
  else
  return { success: true, payment };
}

async function deletePayment(id) {
  await Payments.findByIdAndRemove(id);
  return { success: true, message: "Successfully Deleted" };
}

async function paypals(data) {
        var result;
        const create_payment_json = {
          intent: "sale",
          payer: {
              payment_method: "paypal"
          },
          redirect_urls: {
              return_url: "http://localhost:3000/success",
              cancel_url: "http://localhost:3000/cancel"
          },
          transactions: [{
              item_list: {
                  items: [{
                      name: "Redhock Bar Soap",
                      sku: "001",
                      price: "25.00",
                      currency: "USD",
                      quantity: 1
                  }]
              },
              amount: {
                  currency: "USD",
                  total: "25.00"
              },
              description: "Washing Bar soap"
          }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            result = error;
            throw error;
        } else {
            result = payment;
            for(let i = 0;i < payment.links.length;i++) {
              if(payment.links[i].rel === 'approval_url'){
                console.log(payment.links[i].href,"KKKKKKKKKKKKK")
                return payment.links[i].href
              }
            }
        }
    });
}

async function allPayments() {

    const paymentIntents = await stripe.paymentIntents.list({
        limit: 5,
    });
    console.log(paymentIntents.data[0].invoice)
    for(var i = 0; i<paymentIntents.data.length; i++)
    {
        if(paymentIntents.data[i].invoice)
        {
            paymentIntents.data[i].invoice_details = await stripe.invoices.retrieve(
                paymentIntents.data[i].invoice
            );
        }
    }
    return { success: true, paymentIntents };
}