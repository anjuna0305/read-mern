import PO from "../models/POmodels";

export const getPOs = async (req: Request, res: Response) => {
    try {
      const POs = await PO.find();
      res.status(200).json(POs);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }