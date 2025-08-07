// src/components/QuestionBuilder.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  media?: string;
  mediaType?: 'image' | 'video';
}

interface Post {
  id: number;
  content?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
  timestamp: string;
}

interface Props {
  onCreatePost: (post: Post) => void;
}

const QuestionBuilder: React.FC<Props> = ({ onCreatePost }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [postText, setPostText] = useState('');
  const [postMedia, setPostMedia] = useState<{ src: string; type: 'image' | 'video' } | null>(null);
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const handlePostMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const type = file.type.startsWith('video') ? 'video' : 'image';
      setPostMedia({ src: result, type });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateOrEditPost = () => {
    if (!postText && !postMedia) {
      alert('Post must have text or media.');
      return;
    }
    if (editPostId !== null) {
      // edit existing pending post
      setPendingPosts(prev => prev.map(p => p.id === editPostId ? { ...p, content: postText, media: postMedia || undefined } : p));
      setEditPostId(null);
    } else {
      const newPost: Post = {
        id: Date.now(),
        content: postText,
        media: postMedia || undefined,
        timestamp: new Date().toISOString(),
      };
      setPendingPosts(prev => [newPost, ...prev]);
    }
    setPostText('');
    setPostMedia(null);
  };

  const handleEditPending = (id: number) => {
    const post = pendingPosts.find(p => p.id === id);
    if (!post) return;
    setPostText(post.content || '');
    setPostMedia(post.media || null);
    setEditPostId(id);
  };

  const handleDeletePending = (id: number) => {
    setPendingPosts(prev => prev.filter(p => p.id !== id));
    if (editPostId === id) {
      setEditPostId(null);
      setPostText('');
      setPostMedia(null);
    }
  };

  const handlePublish = (id: number) => {
    const post = pendingPosts.find(p => p.id === id);
    if (!post) return;
    onCreatePost(post);
    setPendingPosts(prev => prev.filter(p => p.id !== id));
  };

  // Existing question import/export logic remains unchanged
  const handleQuestionMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...questions];
      const result = reader.result as string;
      updated[index] = {
        ...updated[index],
        media: result,
        mediaType: file.type.startsWith('video') ? 'video' : 'image',
      };
      setQuestions(updated);
    };
    reader.readAsDataURL(file);
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          setQuestions(imported);
        }
      } catch {
        alert('Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const exportToCSV = () => {
    const csvData = questions.map(q => ({
      question: q.question,
      option1: q.options[0],
      option2: q.options[1],
      option3: q.options[2],
      option4: q.options[3],
      correctAnswer: q.correctAnswer,
      media: q.media || '',
      mediaType: q.mediaType || ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const parsed = result.data.map((row: any) => ({
            question: row.question,
            options: [row.option1, row.option2, row.option3, row.option4],
            correctAnswer: parseInt(row.correctAnswer, 10),
            media: row.media || '',
            mediaType: row.mediaType === 'video' ? 'video' : 'image'
          }));
          setQuestions(parsed.map((q: any) => ({
  ...q,
  mediaType: ['video', 'image'].includes(q.mediaType) ? q.mediaType : undefined
})));

        } catch {
          alert('Invalid CSV format.');
        }
      },
    });
  };

  return (
    <div>
      <h2>Admin Question Builder</h2>

      {/* Post Creation Section */}
      <div className="post-creator" style={{ marginBottom: '2rem' }}>
        <h3>{editPostId !== null ? 'Edit Pending Post' : 'Create Post'}</h3>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your post..."
          rows={4}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <input type="file" accept="image/*,video/*" onChange={handlePostMediaUpload} />
        <div style={{ marginTop: '0.5rem' }}>
          <button onClick={handleCreateOrEditPost}>
            {editPostId !== null ? 'Save Changes' : 'Add to Pending'}
          </button>
        </div>
      </div>

      {/* Pending Posts */}
      {pendingPosts.length > 0 && (
        <div className="pending-posts">
          <h3>Pending Posts</h3>
          {pendingPosts.map((p) => (
            <div key={p.id} className="pending-post-item" style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}>
              {p.content && <p>{p.content}</p>}
              {p.media && (p.media.type === 'image' ? (
                <img src={p.media.src} alt="preview" style={{ maxWidth: '200px', display: 'block', margin: '0.5rem 0' }} />
              ) : (
                <video controls style={{ maxWidth: '200px', display: 'block', margin: '0.5rem 0' }}>
                  <source src={p.media.src} type="video/mp4" />
                </video>
              ))}
              <button onClick={() => handlePublish(p.id)}>Publish</button>
              <button onClick={() => handleEditPending(p.id)} style={{ marginLeft: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDeletePending(p.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Question Import/Export Controls */}
      <div className="controls">
        <label>Import JSON: <input type="file" accept=".json" onChange={importFromJSON} /></label>
        <label>Import CSV: <input type="file" accept=".csv" onChange={importFromCSV} /></label>
        <button onClick={exportToJSON}>Export as JSON</button>
        <button onClick={exportToCSV}>Export as CSV</button>
      </div>

      {/* Question Preview */}
      <div className="preview">
        <h3>Preview Questions:</h3>
        {questions.map((q, index) => (
          <div key={index} className="question-preview">
            <p><strong>Q:</strong> {q.question}</p>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <p><strong>Correct Answer:</strong> {q.options[q.correctAnswer]}</p>
            {q.media && (q.mediaType === 'video' ? (
              <video controls width="320">
                <source src={q.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={q.media} alt="media" width="320" />
            ))}
            <input type="file" accept="image/*,video/*" onChange={(e) => handleQuestionMediaUpload(e, index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBuilder;
