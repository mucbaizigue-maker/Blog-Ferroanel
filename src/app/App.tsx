import { useEffect, useMemo, useState } from 'react';

type PostStatus = 'published' | 'pending' | 'hidden';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface Post {
  id: string;
  author: string;
  title: string;
  category: string;
  content: string;
  date: string;
  imageUrl?: string;
  likes: number;
  reports: number;
  status: PostStatus;
  comments: Comment[];
}

const STORAGE_KEY = 'ferroanelPostsV2';
const ADMIN_CODE = 'ferroanel2026';

const CATEGORIES = [
  'Todos',
  'Infraestrutura Ferroviaria',
  'Logistica',
  'Mobilidade Urbana',
  'Operacoes Ferroviarias',
  'Projetos Ferroanel',
  'Economia',
  'Urbanismo',
  'Pesquisa Tecnica'
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-logistica-ferroanel',
    author: 'Administracao',
    title: 'Como o Ferroanel pode transformar a logistica paulista',
    category: 'Logistica',
    content:
      'O Ferroanel possui potencial para reorganizar o transporte ferroviario de cargas no Estado de Sao Paulo. Atualmente, muitos trens dividem espaco com linhas urbanas de passageiros, gerando conflitos operacionais e reduzindo a eficiencia logistica.\n\nCom a implantacao do Ferroanel, o transporte de cargas pode ser desviado das areas urbanas, reduzindo gargalos ferroviarios e melhorando a circulacao de mercadorias entre regioes industriais e portos estrategicos.',
    date: new Date().toLocaleString('pt-BR'),
    imageUrl:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    likes: 12,
    reports: 0,
    status: 'published',
    comments: [
      {
        id: 'comment-logistica-1',
        author: 'Leitor Ferroviario',
        content: 'Esse ponto da separacao entre cargas e passageiros e essencial para a eficiencia do sistema.',
        date: new Date().toLocaleString('pt-BR')
      }
    ]
  },
  {
    id: 'post-economia-ferroanel',
    author: 'Equipe Ferroanel',
    title: 'Beneficios economicos do Ferroanel para Sao Paulo',
    category: 'Economia',
    content:
      'O projeto do Ferroanel pode gerar impactos positivos significativos para a economia paulista. A melhoria da infraestrutura ferroviaria reduz custos logisticos, aumenta a competitividade industrial e fortalece corredores de exportacao.\n\nA expansao ferroviaria tambem tende a estimular investimentos privados, crescimento industrial e geracao de empregos ligados ao setor logistico.',
    date: new Date().toLocaleString('pt-BR'),
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    likes: 8,
    reports: 0,
    status: 'published',
    comments: []
  },
  {
    id: 'post-mobilidade-ferroanel',
    author: 'Editor Oficial',
    title: 'Impactos sociais e urbanos do Ferroanel',
    category: 'Mobilidade Urbana',
    content:
      'A separacao entre transporte urbano de passageiros e transporte ferroviario de cargas pode melhorar significativamente a mobilidade urbana da Regiao Metropolitana de Sao Paulo.\n\nO Ferroanel tambem pode reduzir riscos operacionais em areas urbanas, diminuir interferencias no transito e ampliar a eficiencia do sistema ferroviario paulista.',
    date: new Date().toLocaleString('pt-BR'),
    imageUrl:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    likes: 10,
    reports: 0,
    status: 'published',
    comments: []
  }
];

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const cardStyle = {
  background: 'white',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: '8px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)'
};

const inputStyle = {
  width: '100%',
  border: '1px solid #dbe4ee',
  background: '#f8fbff',
  padding: '13px 14px',
  borderRadius: '8px',
  fontSize: '0.98rem',
  color: '#0f172a',
  boxSizing: 'border-box' as const
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infraestrutura Ferroviaria');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [commentDrafts, setCommentDrafts] = useState<Record<string, { author: string; content: string }>>({});
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
      return;
    }

    const oldPosts = localStorage.getItem('ferroanelPosts');
    if (oldPosts) {
      const migratedPosts = JSON.parse(oldPosts).map((post: Partial<Post>, index: number) => ({
        id: post.id || `migrated-${index}-${newId()}`,
        author: post.author || 'Visitante',
        title: post.title || 'Anotacao sem titulo',
        category: post.category || 'Pesquisa Tecnica',
        content: post.content || '',
        date: post.date || new Date().toLocaleString('pt-BR'),
        imageUrl: post.imageUrl || '',
        likes: post.likes || 0,
        reports: post.reports || 0,
        status: post.status || 'published',
        comments: post.comments || []
      }));
      setPosts(migratedPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedPosts));
      return;
    }

    setPosts(INITIAL_POSTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  }, []);

  const savePosts = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  const publishPost = () => {
    if (!author.trim() || !title.trim() || !content.trim()) {
      alert('Preencha nome, titulo e conteudo.');
      return;
    }

    if (content.trim().length < 30) {
      alert('Escreva uma anotacao um pouco mais completa, com pelo menos 30 caracteres.');
      return;
    }

    const newPost: Post = {
      id: newId(),
      author: author.trim(),
      title: title.trim(),
      category,
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      date: new Date().toLocaleString('pt-BR'),
      likes: 0,
      reports: 0,
      status: 'published',
      comments: []
    };

    savePosts([newPost, ...posts]);
    setAuthor('');
    setTitle('');
    setContent('');
    setImageUrl('');
    alert('Anotacao publicada com sucesso!');
  };

  const updatePost = (postId: string, changes: Partial<Post>) => {
    savePosts(posts.map((post) => (post.id === postId ? { ...post, ...changes } : post)));
  };

  const deletePost = (postId: string) => {
    const confirmed = confirm('Excluir esta publicacao?');
    if (confirmed) {
      savePosts(posts.filter((post) => post.id !== postId));
    }
  };

  const likePost = (postId: string) => {
    savePosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  const reportPost = (postId: string) => {
    savePosts(posts.map((post) => (post.id === postId ? { ...post, reports: post.reports + 1 } : post)));
    alert('Obrigado. A publicacao foi marcada para revisao.');
  };

  const addComment = (postId: string) => {
    const draft = commentDrafts[postId];
    if (!draft?.author.trim() || !draft?.content.trim()) {
      alert('Preencha nome e comentario.');
      return;
    }

    const newComment: Comment = {
      id: newId(),
      author: draft.author.trim(),
      content: draft.content.trim(),
      date: new Date().toLocaleString('pt-BR')
    };

    savePosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
    setCommentDrafts({ ...commentDrafts, [postId]: { author: '', content: '' } });
  };

  const visiblePosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesStatus = post.status === 'published';
      const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term);

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, activeCategory]);

  const featuredPost = visiblePosts[0];
  const recentPosts = visiblePosts.slice(featuredPost ? 1 : 0);
  const pendingCount = posts.filter((post) => post.status === 'pending' || post.reports > 0).length;

  const enterAdminMode = () => {
    if (adminCode === ADMIN_CODE) {
      setIsAdmin(true);
      setAdminCode('');
    } else {
      alert('Codigo administrativo incorreto.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#eef3f8', color: '#1e293b', fontFamily: 'Inter, Arial, sans-serif' }}>
      <header
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.52)), url("https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '42px 6% 36px'
        }}
      >
        <nav
          style={{
            maxWidth: '1280px',
            margin: '0 auto 42px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap'
          }}
        >
          <strong style={{ fontSize: '1.1rem', letterSpacing: '0.08em' }}>FERROANEL HUB</strong>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Posts', 'Categorias', 'Publicar', 'Moderacao'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 12px', color: '#bfdbfe', fontWeight: 700 }}>Blog colaborativo ferroviario</p>
          <h1 style={{ maxWidth: '760px', margin: 0, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', lineHeight: 1.05 }}>
            Estudos, ideias e notas publicas sobre o Ferroanel
          </h1>
          <p style={{ maxWidth: '760px', lineHeight: 1.75, color: '#e2e8f0', fontSize: '1.08rem' }}>
            Publique anotacoes, leia analises, comente pesquisas e acompanhe discussoes sobre logistica, mobilidade,
            infraestrutura ferroviaria e desenvolvimento paulista.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '30px' }}>
            {[
              ['Posts publicados', posts.filter((post) => post.status === 'published').length],
              ['Categorias', CATEGORIES.length - 1],
              ['Comentarios', posts.reduce((total, post) => total + post.comments.length, 0)],
              ['Em revisao', pendingCount]
            ].map(([label, value]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '8px', padding: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.9rem' }}>{value}</strong>
                <span style={{ color: '#dbeafe' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main style={{ width: '92%', maxWidth: '1280px', margin: '28px auto 48px' }}>
        <section id="categorias" style={{ ...cardStyle, padding: '20px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                style={{
                  border: activeCategory === item ? '1px solid #2563eb' : '1px solid #dbe4ee',
                  background: activeCategory === item ? '#2563eb' : 'white',
                  color: activeCategory === item ? 'white' : '#334155',
                  borderRadius: '999px',
                  padding: '10px 14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="blog-shell" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '22px', alignItems: 'start' }}>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <section id="publicar" style={{ ...cardStyle, padding: '22px' }}>
              <h2 style={{ marginTop: 0 }}>Publicar anotacao</h2>
              <label style={{ fontWeight: 700 }}>Nome do autor</label>
              <input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Digite seu nome" style={inputStyle} />

              <label style={{ display: 'block', fontWeight: 700, marginTop: '14px' }}>Titulo</label>
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Titulo da publicacao" style={inputStyle} />

              <label style={{ display: 'block', fontWeight: 700, marginTop: '14px' }}>Categoria</label>
              <select value={category} onChange={(event) => setCategory(event.target.value)} style={inputStyle}>
                {CATEGORIES.filter((item) => item !== 'Todos').map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <label style={{ display: 'block', fontWeight: 700, marginTop: '14px' }}>Imagem opcional</label>
              <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Cole uma URL de imagem" style={inputStyle} />

              <label style={{ display: 'block', fontWeight: 700, marginTop: '14px' }}>Conteudo</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Escreva sua pesquisa, ideia, anotacao ou analise..."
                style={{ ...inputStyle, minHeight: '170px', lineHeight: 1.7, resize: 'vertical' }}
              />

              <button
                onClick={publishPost}
                style={{
                  marginTop: '16px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#2563eb',
                  color: 'white',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Publicar agora
              </button>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                As publicacoes aparecem imediatamente e podem ser moderadas pelo administrador local.
              </p>
            </section>

            <section id="moderacao" style={{ ...cardStyle, padding: '22px' }}>
              <h2 style={{ marginTop: 0 }}>Moderacao</h2>
              {!isAdmin ? (
                <>
                  <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                    Entre como administrador para ocultar, republicar ou excluir posts denunciados.
                  </p>
                  <input
                    type="password"
                    value={adminCode}
                    onChange={(event) => setAdminCode(event.target.value)}
                    placeholder="Codigo admin"
                    style={inputStyle}
                  />
                  <button
                    onClick={enterAdminMode}
                    style={{ marginTop: '12px', width: '100%', border: '1px solid #2563eb', color: '#2563eb', background: 'white', borderRadius: '8px', padding: '12px', fontWeight: 800 }}
                  >
                    Entrar
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {posts.filter((post) => post.reports > 0 || post.status !== 'published').length === 0 && (
                    <p style={{ color: '#64748b' }}>Nenhum item pendente no momento.</p>
                  )}
                  {posts
                    .filter((post) => post.reports > 0 || post.status !== 'published')
                    .map((post) => (
                      <div key={post.id} style={{ border: '1px solid #dbe4ee', borderRadius: '8px', padding: '12px' }}>
                        <strong>{post.title}</strong>
                        <p style={{ margin: '6px 0', color: '#64748b' }}>
                          Status: {post.status} | Denuncias: {post.reports}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button onClick={() => updatePost(post.id, { status: 'published', reports: 0 })}>Publicar</button>
                          <button onClick={() => updatePost(post.id, { status: 'hidden' })}>Ocultar</button>
                          <button onClick={() => deletePost(post.id)}>Excluir</button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>

            <section style={{ ...cardStyle, padding: '22px', lineHeight: 1.7 }}>
              <strong>Proximo passo tecnico</strong>
              <p>
                O app esta pronto para receber um banco online. Com Supabase ou Firebase, os posts passam a aparecer
                para todos os visitantes em qualquer dispositivo.
              </p>
            </section>
          </aside>

          <section id="posts" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <section style={{ ...cardStyle, padding: '18px' }}>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pesquisar por titulo, autor, categoria ou conteudo..."
                style={inputStyle}
              />
            </section>

            {featuredPost && (
              <article style={{ ...cardStyle, overflow: 'hidden' }}>
                {featuredPost.imageUrl && (
                  <img src={featuredPost.imageUrl} alt={featuredPost.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '24px' }}>
                  <span style={{ background: '#dbeafe', color: '#1d4ed8', borderRadius: '999px', padding: '8px 12px', fontWeight: 800 }}>
                    Destaque - {featuredPost.category}
                  </span>
                  <h2 style={{ fontSize: '2rem', lineHeight: 1.25 }}>{featuredPost.title}</h2>
                  <p style={{ color: '#64748b' }}>Publicado por {featuredPost.author} em {featuredPost.date}</p>
                  <p style={{ lineHeight: 1.9, whiteSpace: 'pre-line' }}>{featuredPost.content}</p>
                  <PostActions post={featuredPost} onLike={likePost} onReport={reportPost} />
                </div>
              </article>
            )}

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              {recentPosts.map((post) => (
                <article key={post.id} style={{ ...cardStyle, overflow: 'hidden' }}>
                  {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '170px', objectFit: 'cover' }} />}
                  <div style={{ padding: '18px' }}>
                    <span style={{ color: '#2563eb', fontWeight: 800 }}>{post.category}</span>
                    <h3 style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ color: '#64748b' }}>Por {post.author} - {post.date}</p>
                    <p style={{ lineHeight: 1.75, whiteSpace: 'pre-line' }}>{post.content}</p>
                    <PostActions post={post} onLike={likePost} onReport={reportPost} />

                    <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '16px', paddingTop: '16px' }}>
                      <strong>Comentarios ({post.comments.length})</strong>
                      {post.comments.map((comment) => (
                        <div key={comment.id} style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                          <strong>{comment.author}</strong>
                          <p style={{ margin: '4px 0', lineHeight: 1.5 }}>{comment.content}</p>
                          <small style={{ color: '#64748b' }}>{comment.date}</small>
                        </div>
                      ))}
                      <input
                        value={commentDrafts[post.id]?.author || ''}
                        onChange={(event) =>
                          setCommentDrafts({ ...commentDrafts, [post.id]: { ...commentDrafts[post.id], author: event.target.value, content: commentDrafts[post.id]?.content || '' } })
                        }
                        placeholder="Seu nome"
                        style={{ ...inputStyle, marginTop: '12px' }}
                      />
                      <textarea
                        value={commentDrafts[post.id]?.content || ''}
                        onChange={(event) =>
                          setCommentDrafts({ ...commentDrafts, [post.id]: { author: commentDrafts[post.id]?.author || '', content: event.target.value } })
                        }
                        placeholder="Comente esta anotacao"
                        style={{ ...inputStyle, minHeight: '82px', marginTop: '8px', resize: 'vertical' }}
                      />
                      <button onClick={() => addComment(post.id)} style={{ marginTop: '8px', border: '1px solid #2563eb', color: '#2563eb', background: 'white', borderRadius: '8px', padding: '10px 12px', fontWeight: 800 }}>
                        Comentar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {visiblePosts.length === 0 && (
              <section style={{ ...cardStyle, padding: '46px', textAlign: 'center', color: '#64748b' }}>
                <h2>Nenhuma publicacao encontrada</h2>
                <p>Tente outra busca ou publique uma nova anotacao.</p>
              </section>
            )}
          </section>
        </section>
      </main>

      <footer style={{ padding: '28px', textAlign: 'center', background: '#0f172a', color: '#cbd5e1' }}>
        Ferroanel Hub - Blog colaborativo com publicacao aberta, comentarios, categorias e moderacao local.
      </footer>
    </div>
  );
}

function PostActions({
  post,
  onLike,
  onReport
}: {
  post: Post;
  onLike: (postId: string) => void;
  onReport: (postId: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
      <button onClick={() => onLike(post.id)} style={{ border: '1px solid #dbe4ee', background: 'white', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer' }}>
        Curtir ({post.likes})
      </button>
      <button onClick={() => onReport(post.id)} style={{ border: '1px solid #fca5a5', background: '#fff1f2', color: '#b91c1c', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer' }}>
        Denunciar ({post.reports})
      </button>
    </div>
  );
}
