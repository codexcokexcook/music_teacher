Transactions = new Mongo.Collection('transactions');

Meteor.methods({

  'transactions.insert'(
    trans_no,
    buyer_id,
    seller_id,
    order_id,
    stripeToken
  ){
    Transactions.insert({
      transaction_no: trans_no,
      buyer_id: buyer_id,
      seller_id: seller_id,
      'order': [order_id],
      status: 'Received',
      stripeToken: stripeToken,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },


  'transactions.update'(
    trans_no,
    buyer_id,
    seller_id,
    order_id,
    stripeToken
  ){Transactions.update(
    { transaction_no: trans_no,
      buyer_id: buyer_id,
      seller_id: seller_id,
      stripeToken: stripeToken},
    {'$push':{'order': order_id},
     '$set': {'updatedAt': new Date()}

  })
  }

})
