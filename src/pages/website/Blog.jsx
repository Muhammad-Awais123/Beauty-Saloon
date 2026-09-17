import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import BlogCard from '../../components/website/BlogCard';
import Badge from '../../components/common/Badge';
import { BLOG_CATEGORIES } from '../../data/blogsData';

export default function Blog() {
  const { blogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const featuredBlog = blogs.find(b => b.featured) || blogs[0];

  const filteredBlogs = blogs.filter(b => {
    const matchesCat = selectedCategory === 'All Articles' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Medical Journal"
            title="Aesthetic Science & Dermatological Insights"
            subtitle="Explore evidence-based articles authored by our physicians on skin biology, laser physics, and cellular rejuvenation."
          />
        </div>

        {/* Featured Article Hero (if no search active) */}
        {!searchQuery && selectedCategory === 'All Articles' && featuredBlog && (
          <div className="mb-12 rounded-2xl bg-white border border-charcoal-200 overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 aspect-[16/10] bg-charcoal-900 overflow-hidden">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="sage" size="sm">Featured Clinical Insight</Badge>
                <span className="text-xs text-charcoal-400">• {featuredBlog.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 leading-snug hover:text-clinic-800 transition-colors">
                <Link to={`/blog/${featuredBlog.id}`}>
                  {featuredBlog.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                {featuredBlog.summary}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-charcoal-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredBlog.authorImage}
                    alt={featuredBlog.author}
                    className="w-8 h-8 rounded-full object-cover border border-charcoal-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">{featuredBlog.author}</p>
                    <p className="text-[10px] text-charcoal-400">{featuredBlog.authorRole}</p>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredBlog.id}`}
                  className="text-xs font-bold text-clinic-700 hover:text-clinic-900 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-clinic-700 text-white shadow-sm'
                    : 'bg-surface-muted text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scientific articles..."
              className="w-full rounded-lg border border-charcoal-200 pl-9 pr-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </div>
  );
}
