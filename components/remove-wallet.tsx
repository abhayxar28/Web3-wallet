import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from "lucide-react"

type DeleteWalletIndexProps = {
  deleteWalletAtIndex: (index: number) => void;
  index: number;
};


export default function DeleteWalletIndex({deleteWalletAtIndex, index}: DeleteWalletIndexProps){
    return(
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="bg-[#0a0a0a] cursor-pointer hover:bg-[#171717]">
                    <Trash className="text-red-800" size={16}/>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete your wallet?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your wallets and keys from local storage.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteWalletAtIndex(index)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}