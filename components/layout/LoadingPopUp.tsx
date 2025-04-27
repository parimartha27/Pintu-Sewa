import { Card, CardContent } from "../ui/card";

const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative z-10 w-[90%] max-w-md p-4 rounded-2xl">
        <Card className="w-full p-4 shadow-xl rounded-lg bg-white pt-10 ">
          <CardContent className="flex flex-col items-center space-y-4">
            <h3 className="text-xl lg:text-2xl font-bold text-color-secondary">
              Mohon Tunggu. . .
            </h3>
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-color-primaryDark border-t-transparent border-solid rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingPopup;
