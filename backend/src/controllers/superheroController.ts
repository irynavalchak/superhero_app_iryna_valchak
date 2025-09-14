import {Request, Response} from "express"
import Superhero from "#models/Superhero.js"
import fs from "fs"

//GET all and pagination

export const getSuperheroes = async (req: Request, res: Response) => {
    try {
        //what is the page
        const page = parseInt(req.query.page as string) || 1

        //5 items per page max
        const limit = parseInt(req.query.limit as string) || 5

        // how many page should be skiped
        const skip = (page - 1) * limit 

        //pulling from db
        const superheroes = await Superhero.find().skip(skip).limit(limit)
        const total = await Superhero.countDocuments()

        //response in json
        res.json({ superheroes, total, page, totalPages: Math.ceil(total / limit)})
    } catch (errror) {
        res.status(500).json({ message: "Error fetching data"})
    }
}

//GET by id

export const getSuperheroById = async (req: Request, res: Response) => {
    try {
        const hero = await Superhero.findById(req.params.id)
        if(!hero) return res.status(404).json({ message: "Superhero not found"})
        res.json(hero)
    }catch (error) {
        res.status(500).json({ message: "Error fetching superhero"})
    }
}

// CREATE superhero
export const createSuperhero = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { nickname, real_name, origin_description, catch_phrase } = req.body;
    let superpowers = req.body.superpowers;
    if (!Array.isArray(superpowers)) {
      superpowers = superpowers ? [superpowers] : [];
    }
    const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

    if (!nickname || !real_name || !origin_description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hero = new Superhero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images
    });
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).json({ message: "Error creating superhero" });
    console.error("❌ Error creating superhero:", error);
  }
};

// UPDATE superhero

export const updateSuperhero = async (req: Request, res: Response) => {
    try {
        const { nickname, real_name, origin_description, catch_phrase, superpowers, imagesToRemove } = req.body;
        const newImages = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

        const hero = await Superhero.findById(req.params.id);
        if(!hero) return res.status(404).json({message: "Superhero not found"});

        const parsedImagesToRemove = JSON.parse(imagesToRemove || "[]");

        if (parsedImagesToRemove.length > 0) {
            parsedImagesToRemove.forEach((imagePath: string) => {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error(`Error deleting image: ${imagePath}`, err);
                });
            });
            hero.images = hero.images.filter((image: string) => !parsedImagesToRemove.includes(image));
        }

        hero.nickname = nickname;
        hero.real_name = real_name;
        hero.origin_description = origin_description;
        hero.catch_phrase = catch_phrase;
        hero.superpowers = superpowers;
        hero.images = [...hero.images, ...newImages];

        await hero.save();

        res.json(hero);
    }catch(error) {
        res.status(400).json({ message: "Error updating superhero" });
    }
}

// DELETE superhero
export const deleteSuperhero = async (req: Request, res: Response) => {
  try {
    const hero = await Superhero.findByIdAndDelete(req.params.id)
    if (!hero) return res.status(404).json({ message: "Superhero not found" })
    res.json({ message: "Superhero deleted" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting superhero" })
  }
}