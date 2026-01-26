//responsavel por baixar o modelo de currículo

export default function DownloadPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 w-full h-full">
        <h1 className="text-2xl font-bold">Baixar Modelo</h1>
        <p className="text-muted-foreground">
          Baixe o modelo de currículo para editar e enviar para as vagas
        </p>
        <a
          href="/modelodeCv.pdf"
          download="Modelo_de_Curriculo.pdf"
          className="bg-primary text-white px-4 py-2 rounded-lg w-fit animate-in fade-in duration-500
                hover:bg-primary/80 transition-colors active:translate-y-1 flex items-center justify-center"
        >
          Baixar
        </a>
      </div>
    </div>
  );
}
