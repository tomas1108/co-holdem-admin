import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Spinner;
