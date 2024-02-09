import Link from "next/link";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <label htmlFor="email">
          Email
          <input type="text" maxLength={255} />
        </label>
        <label htmlFor="password">
          Senha
          <input type="text" maxLength={255} />
        </label>
        <button type="submit">Sing in</button>
        <span>Entrar no modo anonimo</span>
        <Link href={"/"}> Home</Link>
      </section>
    </main>
  );
}
