import { AuthForm } from "@/components/layout/auth/AuthForm"

const LoginPage = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-color-third px-2">
            <AuthForm type="login" className="relative z-10"/>
            <div className="bg-custom-circle-gradient-bl w-5/6 rounded-full h-[calc(100vh*1.7)] absolute -left-1/4"></div>
        </main>
    )
}

export default LoginPage;