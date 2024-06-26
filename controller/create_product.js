const Product = require('../model/product');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({ 
  cloud_name: 'doohfuqj3', 
  api_key: '652251984127554', 
  api_secret: 'G5usqBPKCu0-NRVFPyIb50oDueo' 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: storage });

const upload_profile = upload.single('product_picture'); // Use the field name 'product_picture'

const create_prodcut_api = async (req, res) => {
  try {
    // Assuming 'product_picture' is a file upload field in your form
    upload_profile(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Multer error', error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: 'Unknown error', error: err });
      }

      const { product_name, product_price, product_detail } = req.body;
      const product_picture = req.file.path; // Use req.file.path for Cloudinary URL

      const newProduct = await Product.create({
        product_name,
        product_price,
        product_detail,
        product_picture,
      });

      res.json({ success: true, data: newProduct });
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};


const fetch_product = async (req,res)=>{
    const product = await Product.find();
    res.json(product);
}

const delete_product = async(req , res) =>{
  const id = req.params.id;
  const product = await Product.findByIdAndRemove(id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found'
      });
      
      }
      res.json({ success: true, message: 'Product deleted successfully' });

}

module.exports = {
  create_prodcut_api,
  fetch_product,
  delete_product,
};
