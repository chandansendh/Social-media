const Post = require("../Model/post-model");

const post = async(req,res)=>{
    try {
        const responce = req.body;
        console.log(responce);
        await Post.create(responce);
        return res.status(200).json({message:"Post saved"})
    } catch (error) {
        return res.status(500).json({message:"Post save faild"})
        
    }
};
const getPost=async(req,res)=>{
    try {
        const responce = req.body;
        const data = await Post.find();
        return res.status(200).json({message:data});
    } catch (error) {
        return res.status(500).json({ message: "No data found" });
    }
};

const like = async (req, res) => {
  try {
    const response = req.body._id;
    const data = req.body;
    console.log(data);
    await Post.findByIdAndUpdate(response, {
      likes:data.likes
    });
    return res.status(200).json({ message: "Update Successful" });
  } catch (error) {
    return res.status(500).json({ message: "Update fail" });
  }
};

module.exports={post,getPost,like};