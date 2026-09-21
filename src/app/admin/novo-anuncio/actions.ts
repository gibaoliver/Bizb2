'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAnuncio(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Usuário não autenticado.' }
  }

  // Extrair campos básicos
  const titulo = formData.get('titulo') as string
  const categoria = formData.get('categoria') as string
  const condicao = formData.get('condicao') as string
  const descricao = formData.get('descricao') as string
  const precoString = formData.get('preco') as string
  const negociavel = formData.get('negociavel') === 'on' || formData.get('negociavel') === 'true'
  const localizacao = formData.get('localizacao') as string
  const status = formData.get('status') as string || 'ativo'

  if (!titulo || !categoria || !condicao || !descricao || !precoString || !localizacao) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }

  // Tratar preço (remover máscaras se houver e transformar em número)
  const preco = parseFloat(precoString.replace(/[^\d.,]/g, '').replace(',', '.'))
  if (isNaN(preco)) {
    return { error: 'Valor inválido.' }
  }

  // Upload das imagens
  const fotoFiles = formData.getAll('fotos') as File[]
  const fotoUrls: string[] = []

  for (let i = 0; i < fotoFiles.length; i++) {
    const file = fotoFiles[i]
    if (file.size === 0) continue // Ignorar arquivos vazios se houver

    const ext = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagens_anuncios')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Erro no upload da foto:', uploadError)
      return { error: `Erro ao fazer upload da imagem ${i + 1}.` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('imagens_anuncios')
      .getPublicUrl(fileName)

    fotoUrls.push(publicUrl)
  }

  // Salvar no banco de dados
  const { error: insertError } = await supabase
    .from('anuncios')
    .insert({
      autor_id: user.id,
      titulo,
      categoria,
      condicao,
      descricao,
      preco,
      negociavel,
      localizacao,
      status,
      fotos: fotoUrls
    })

  if (insertError) {
    console.error('Erro ao salvar anúncio:', insertError)
    return { error: 'Erro ao salvar o anúncio no banco de dados.' }
  }

  revalidatePath('/admin/anuncios')
  redirect('/admin/anuncios')
}
