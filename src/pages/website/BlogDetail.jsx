import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Calendar, Clock, ChevronRight, Share2, ArrowLeft, Bookmark, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import BlogCard from '../../components/website/BlogCard';

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs } = useApp();

  const blog = blogs.find(b => b.id === id || b.slug === id);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-charcoal-500 mb-6">The article you requested is no longer available.</p>
        <Button to="/blog" variant="primary">Browse All Articles</Button>
      </div>
    );
  }

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    } else {
      toast.info('Sharing link copied!');
    }
  };

  return (
    <div className="bg-surface-soft min-h-screen pb-20 text-left">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-charcoal-100 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link to="/" className="hover:text-clinic-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link to="/blog" className="hover:text-clinic-800">Medical Journal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <span className="text-charcoal-900 font-semibold truncate">{blog.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Header Block */}
        <div className="mb-8">
          <Badge variant="sage" size="md" className="mb-4">
            {blog.category}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author & Meta Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-charcoal-200">
            <div className="flex items-center gap-3">
              <img
                src={blog.authorImage || '/images/team/team-doctor-01.jpg'}
                alt={blog.author}
                className="w-10 h-10 rounded-full object-cover border border-charcoal-200"
              />
              <div>
                <p className="text-xs font-bold text-charcoal-900">{blog.author}</p>
                <p className="text-[11px] text-charcoal-500">{blog.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg border border-charcoal-200 bg-white hover:bg-clinic-50 hover:text-clinic-800 transition-colors"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-charcoal-200 shadow-card mb-10 aspect-[16/9] bg-charcoal-900">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 sm:p-12 shadow-card space-y-6 text-charcoal-700 text-sm sm:text-base leading-relaxed mb-12">
          {blog.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={i} className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900 pt-4 pb-1">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <div key={i} className="pl-4 py-1 text-xs sm:text-sm text-charcoal-700 space-y-2">
                  <p>{paragraph}</p>
                </div>
              );
            }
            return (
              <p key={i} className="text-xs sm:text-sm leading-relaxed text-charcoal-700">
                {paragraph}
              </p>
            );
          })}

          {/* Tags */}
          {blog.tags && (
            <div className="pt-8 mt-8 border-t border-charcoal-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-400">Tagged with:</span>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded bg-surface-soft border border-charcoal-200 text-charcoal-600 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-8">
            <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
              Related Medical Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <BlogCard key={rel.id} blog={rel} />
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
