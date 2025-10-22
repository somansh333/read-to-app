import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductCardProps {
  product: any;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const ProductCard = ({ product, isOwner, onDelete, onStatusChange }: ProductCardProps) => {
  const conditionColors: Record<string, string> = {
    new: "bg-green-500",
    like_new: "bg-blue-500",
    good: "bg-yellow-500",
    fair: "bg-orange-500",
  };

  const statusColors: Record<string, string> = {
    available: "bg-green-500",
    sold: "bg-red-500",
    reserved: "bg-yellow-500",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
          <Badge className={statusColors[product.status]}>{product.status}</Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <Badge variant="outline" className={conditionColors[product.condition]}>
            {product.condition?.replace("_", " ")}
          </Badge>
        </div>
        {product.categories && (
          <div className="mt-2">
            <Badge variant="secondary">{product.categories.name}</Badge>
          </div>
        )}
        {!isOwner && product.profiles && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-muted-foreground">Seller: {product.profiles.full_name}</p>
            {product.profiles.phone && (
              <p className="text-sm text-muted-foreground">Contact: {product.profiles.phone}</p>
            )}
          </div>
        )}
      </CardContent>
      {isOwner && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Select
            value={product.status}
            onValueChange={(value) => onStatusChange?.(product.id, value)}
          >
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this listing? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete?.(product.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
