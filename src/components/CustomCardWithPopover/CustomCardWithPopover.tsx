import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

type FullCardTypes = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  deleteItem: (id: string, title: string) => void;
};

type CollapsedCardTypes = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
};

const FullCard = ({ id, title, description, icon, deleteItem }: FullCardTypes) => (
  <Card className="rounded-md mb-3">
    <CardHeader className="p-3">
      <CardTitle>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3">{icon}</div>
          <div className="truncate">{title}</div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="px-3">
      <div className="text-xs line-clamp-3 hover:line-clamp-none">{description}</div>
    </CardContent>
    <CardFooter className="p-3">
      <Button variant="default" size="sm" onClick={() => deleteItem(id, title)}>
        Delete
      </Button>
    </CardFooter>
  </Card>
);

const CollapsedCard = ({ id, title, description, icon }: CollapsedCardTypes) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className="bg-neutral-100 rounded-md border-1 border-neutral-400 mt-3 cursor-pointer" key={id}>
        <div className="flex justify-center items-center p-2">{icon}</div>
      </div>
    </PopoverTrigger>
    <PopoverContent className="p-3 w-fit">
      <div className="flex gap-2 items-center">
        {icon}
        <div className="truncate">{title}</div>
      </div>
      <div className="text-xs">{description}</div>
    </PopoverContent>
  </Popover>
);

export { FullCard, CollapsedCard };
