import userModel from "../models/userModel.js"

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body

    if (!userId || !itemId || !size) {
      return res.json({ success: false, message: "Missing required fields" })
    }

    const userData = await userModel.findById(userId)

    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }

    let cartData = userData.cartData || {}

    if (!cartData[itemId]) {
      cartData[itemId] = {}
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0
    }

    cartData[itemId][size] += 1

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({ success: true, message: "Added to Cart" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// ================= UPDATE CART =================
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body

    if (!userId || !itemId || !size) {
      return res.json({ success: false, message: "Missing required fields" })
    }

    const userData = await userModel.findById(userId)

    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }

    let cartData = userData.cartData || {}

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.json({ success: false, message: "Item not found in cart" })
    }

    if (quantity <= 0) {
      delete cartData[itemId][size]

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]
      }
    } else {
      cartData[itemId][size] = quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({ success: true, message: "Cart Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// ================= GET USER CART =================
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.json({ success: false, message: "UserId is required" })
    }

    const userData = await userModel.findById(userId)

    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }

    const cartData = userData.cartData || {}

    res.json({ success: true, cartData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


export { addToCart, updateCart, getUserCart }