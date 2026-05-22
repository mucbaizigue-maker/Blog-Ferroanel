import { useState, useEffect } from 'react';

interface Post {
  author: string;
  title: string;
  category: string;
  content: string;
  date: string;
}

const INITIAL_POSTS: Post[] = [
  {
    author: 'Administração',
    title: 'Como o Ferroanel pode transformar a logística paulista',
    category: 'Logística',
    content: 'O Ferroanel possui potencial para reorganizar o transporte ferroviário de cargas no Estado de São Paulo. Atualmente, muitos trens dividem espaço com linhas urbanas de passageiros, gerando conflitos operacionais e reduzindo a eficiência logística.\n\nCom a implantação do Ferroanel, o transporte de cargas poderá ser desviado das áreas urbanas, reduzindo congestionamentos ferroviários e melhorando a circulação de mercadorias entre regiões industriais e portos estratégicos.',
    date: new Date().toLocaleString('pt-BR')
  },
  {
    author: 'Equipe Ferroanel',
    title: 'Benefícios econômicos do Ferroanel para São Paulo',
    category: 'Economia',
    content: 'O projeto do Ferroanel pode gerar impactos positivos significativos para a economia paulista. A melhoria da infraestrutura ferroviária reduz custos logísticos, aumenta a competitividade industrial e fortalece corredores de exportação.\n\nAlém disso, o desenvolvimento ferroviário tende a estimular investimentos privados, expansão industrial e geração de empregos ligados ao setor logístico.',
    date: new Date().toLocaleString('pt-BR')
  },
  {
    author: 'Editor Oficial',
    title: 'Impactos sociais e urbanos do Ferroanel',
    category: 'Mobilidade Urbana',
    content: 'A separação entre transporte urbano de passageiros e transporte ferroviário de cargas pode melhorar significativamente a mobilidade urbana da Região Metropolitana de São Paulo.\n\nO Ferroanel também pode reduzir riscos operacionais em áreas urbanas, diminuir interferências no trânsito e ampliar a eficiência do sistema ferroviário paulista.',
    date: new Date().toLocaleString('pt-BR')
  }
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infraestrutura Ferroviária');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('ferroanelPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('ferroanelPosts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const publishPost = () => {
    if (!author.trim() || !title.trim() || !content.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    const newPost: Post = {
      author: author.trim(),
      title: title.trim(),
      category,
      content: content.trim(),
      date: new Date().toLocaleString('pt-BR')
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('ferroanelPosts', JSON.stringify(updatedPosts));

    setAuthor('');
    setTitle('');
    setContent('');

    alert('Anotação publicada com sucesso!');
  };

  const filteredPosts = posts.filter(post => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ minHeight: '100vh', background: '#eef3f8', color: '#1e293b' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #ffffff, #dcefff)',
        padding: '50px 8%',
        borderBottom: '1px solid #cbd5e1',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: 'auto' }}>
          <h1 style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '15px', fontWeight: '700' }}>
            FERROANEL HUB
          </h1>

          <p style={{ maxWidth: '900px', lineHeight: '1.8', color: '#475569', fontSize: '1.05rem' }}>
            Portal moderno de estudos ferroviários voltado ao Ferroanel,
            logística paulista, infraestrutura ferroviária e impactos econômicos.
            A plataforma reúne análises técnicas, artigos especializados,
            pesquisas logísticas e informações sobre o desenvolvimento ferroviário do Estado de São Paulo.
          </p>

          <div style={{ marginTop: '25px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'white',
              padding: '18px 24px',
              borderRadius: '18px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
              minWidth: '220px'
            }}>
              <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                Logística Inteligente
              </strong>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Estudos sobre eficiência ferroviária e transporte de cargas.
              </span>
            </div>

            <div style={{
              background: 'white',
              padding: '18px 24px',
              borderRadius: '18px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
              minWidth: '220px'
            }}>
              <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                Impactos Econômicos
              </strong>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Análises sobre desenvolvimento regional e industrial.
              </span>
            </div>

            <div style={{
              background: 'white',
              padding: '18px 24px',
              borderRadius: '18px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
              minWidth: '220px'
            }}>
              <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                Infraestrutura
              </strong>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Projetos ferroviários modernos e expansão logística.
              </span>
            </div>

            <div style={{
              background: 'white',
              padding: '18px 24px',
              borderRadius: '18px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
              minWidth: '220px'
            }}>
              <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                Publicação Aberta
              </strong>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Qualquer visitante pode publicar anotações.
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main style={{
        width: '92%',
        maxWidth: '1500px',
        margin: '35px auto',
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 1100 ? '380px 1fr' : '1fr',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Publishing Panel */}
          <section style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
            border: '1px solid rgba(148,163,184,0.15)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '22px', color: '#0f172a', fontWeight: '600' }}>
              Publicar Anotação
            </h2>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '0.95rem' }}>
                Nome do autor
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Digite seu nome"
                style={{
                  width: '100%',
                  border: '1px solid #dbe4ee',
                  background: '#f8fbff',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '0.98rem',
                  color: '#0f172a'
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '0.95rem' }}>
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da anotação"
                style={{
                  width: '100%',
                  border: '1px solid #dbe4ee',
                  background: '#f8fbff',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '0.98rem',
                  color: '#0f172a'
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '0.95rem' }}>
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #dbe4ee',
                  background: '#f8fbff',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '0.98rem',
                  color: '#0f172a'
                }}
              >
                <option>Infraestrutura Ferroviária</option>
                <option>Logística</option>
                <option>Mobilidade Urbana</option>
                <option>Operações Ferroviárias</option>
                <option>Projetos Ferroanel</option>
                <option>Economia</option>
                <option>Urbanismo</option>
                <option>Pesquisa Técnica</option>
              </select>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '0.95rem' }}>
                Anotação
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite sua pesquisa, análise, estudo ou anotação sobre o Ferroanel..."
                style={{
                  width: '100%',
                  border: '1px solid #dbe4ee',
                  background: '#f8fbff',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '0.98rem',
                  color: '#0f172a',
                  minHeight: '220px',
                  resize: 'vertical',
                  lineHeight: '1.8'
                }}
              />
            </div>

            <button
              onClick={publishPost}
              style={{
                width: '100%',
                border: 'none',
                padding: '16px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Publicar Anotação
            </button>
          </section>

          {/* Info Box */}
          <section style={{
            background: 'linear-gradient(135deg, #eff6ff, #f8fafc)',
            border: '1px solid #bfdbfe',
            padding: '22px',
            borderRadius: '20px',
            lineHeight: '1.8',
            color: '#334155'
          }}>
            <strong style={{ color: '#0f172a' }}>Publicação aberta</strong>
            <br /><br />

            Qualquer visitante pode preencher o formulário e publicar uma nova anotação no blog.

            <br /><br />

            Nesta versão, as anotações ficam salvas no navegador de quem publicou. Para que as publicações apareçam para todos os visitantes em qualquer dispositivo, conecte o site a:

            <br /><br />

            • Firebase Firestore<br />
            • Supabase<br />
            • MySQL + PHP<br />
            • Node.js + MongoDB

            <br /><br />

            Depois publique o site em plataformas como GitHub Pages, Netlify ou Vercel.
          </section>
        </aside>

        {/* Feed */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Search */}
          <section style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
            border: '1px solid rgba(148,163,184,0.15)',
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar anotações ferroviárias..."
              style={{
                flex: 1,
                border: '1px solid #dbe4ee',
                padding: '16px',
                borderRadius: '18px',
                background: 'white',
                fontSize: '1rem'
              }}
            />
          </section>

          {/* Benefits Highlights */}
          <section style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
            border: '1px solid rgba(148,163,184,0.15)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#0f172a', fontWeight: '600' }}>
              Destaques Estratégicos do Ferroanel
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{
                background: 'white',
                padding: '18px 24px',
                borderRadius: '18px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.06)'
              }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                  Redução de congestionamentos
                </strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  O Ferroanel pode retirar parte dos trens cargueiros das áreas urbanas da Grande São Paulo.
                </span>
              </div>

              <div style={{
                background: 'white',
                padding: '18px 24px',
                borderRadius: '18px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.06)'
              }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                  Melhoria logística
                </strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Maior eficiência no transporte de cargas entre regiões industriais e portos.
                </span>
              </div>

              <div style={{
                background: 'white',
                padding: '18px 24px',
                borderRadius: '18px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.06)'
              }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                  Menor impacto urbano
                </strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Redução de conflitos ferroviários em áreas densamente povoadas.
                </span>
              </div>

              <div style={{
                background: 'white',
                padding: '18px 24px',
                borderRadius: '18px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.06)'
              }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.2rem', marginBottom: '5px' }}>
                  Desenvolvimento econômico
                </strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Fortalecimento da economia paulista e atração de investimentos logísticos.
                </span>
              </div>
            </div>
          </section>

          {/* Posts */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredPosts.length === 0 ? (
              <div style={{
                background: 'white',
                padding: '70px 30px',
                borderRadius: '24px',
                textAlign: 'center',
                color: '#64748b',
                boxShadow: '0 10px 30px rgba(15,23,42,0.05)'
              }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Nenhuma anotação encontrada</h2>
                <br />
                <p>Tente pesquisar outro termo ou publique novas informações.</p>
              </div>
            ) : (
              [...filteredPosts].reverse().map((post, index) => (
                <article
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '30px',
                    boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
                    border: '1px solid rgba(148,163,184,0.14)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      padding: '8px 14px',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {post.category}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      {post.date}
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: '1.8rem',
                    color: '#0f172a',
                    marginBottom: '12px',
                    lineHeight: '1.4',
                    fontWeight: '600'
                  }}>
                    {post.title}
                  </h3>

                  <div style={{ marginBottom: '20px', color: '#475569', fontSize: '0.98rem' }}>
                    Publicado por <strong>{post.author}</strong>
                  </div>

                  <div style={{
                    lineHeight: '2',
                    color: '#334155',
                    fontSize: '1.02rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {post.content}
                  </div>
                </article>
              ))
            )}
          </section>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '50px',
        padding: '30px',
        textAlign: 'center',
        color: '#64748b',
        borderTop: '1px solid #dbe4ee',
        background: 'white'
      }}>
        Ferroanel Hub - Plataforma ferroviária com publicação aberta - HTML + CSS + JavaScript
      </footer>
    </div>
  );
}


