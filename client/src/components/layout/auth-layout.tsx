import image from "@/assets/auth/auth-bg.jpg";
export const AuthLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="auth-layout  h-screen flex items-center justify-center relative">

            <div className="absolute inset-0 bg-primary/10 -z-1"></div>
            <img
                src={image}
                alt=""
                className="w-full h-full object-cover absolute inset-0 -z-10 opacity-50"
            />
            <div className="md:min-w-96 w-full md:w-fit ">
                {children}
            </div>
        </div>
    );
}