import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { FileText, Plus, Edit2, Trash2, Calendar, Star, Eye } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { BLOG_CATEGORIES } from '../../data/blogsData';

export default function AdminBlogCMS() {
  const { blogs, addBlog, updateBlog, deleteBlog, team } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Skincare',
    author: 'Dr. Elena Vance, MD',
    summary: '',
    content: '',
    image: '/images/blog/blog-profhilo.jpg',
    featured: false
  });

  const handleOpenEdit = (b) => {
    setSelectedBlog(b);
    setFormData({
      title: b.title,
      category: b.category,
      author: b.author,
      summary: b.summary,
      content: b.content,
      image: b.image,
      featured: b.featured || false
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedBlog) {
      updateBlog(selectedBlog.id, formData);
      setShowEditModal(false);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please provide a title and article body.');
      return;
    }
    addBlog(formData);
    setShowAddModal(false);
    setFormData({
      title: '',
      category: 'Skincare',
      author: 'Dr. Elena Vance, MD',
      summary: '',
      content: '',
      image: '/images/blog/blog-profhilo.jpg',
      featured: false
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Medical Journal & Blog CMS
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Author and publish clinical skincare guides, treatment explanations, and clinic announcements.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          New Journal Post
        </Button>
      </div>

      {/* Articles Table */}
      <Table
        headers={[
          'Article & Media',
          'Category',
          'Author',
          'Date',
          'Featured',
          { label: 'Actions', align: 'right' }
        ]}
      >
        {blogs.map((b) => (
          <tr key={b.id} className="hover:bg-surface-soft transition-colors">
            
            {/* Title & Summary */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-10 h-10 rounded-lg object-cover border border-charcoal-200 shrink-0"
                />
                <div>
                  <strong className="text-xs text-charcoal-900 block font-bold max-w-sm truncate">{b.title}</strong>
                  <span className="text-[11px] text-charcoal-400">{b.readTime}</span>
                </div>
              </div>
            </td>

            {/* Category */}
            <td className="py-3.5 px-4">
              <Badge variant="sage" size="sm">{b.category}</Badge>
            </td>

            {/* Author */}
            <td className="py-3.5 px-4 text-xs text-charcoal-700">
              {b.author}
            </td>

            {/* Date */}
            <td className="py-3.5 px-4 text-xs text-charcoal-500">
              {b.date}
            </td>

            {/* Featured */}
            <td className="py-3.5 px-4">
              {b.featured ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Featured
                </span>
              ) : (
                <span className="text-xs text-charcoal-400">Standard</span>
              )}
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-clinic-800 hover:bg-clinic-50 transition-colors"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedBlog(b);
                    setShowDeleteModal(true);
                  }}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* 1. ADD MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Author Medical Journal Article"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
          <Input
            label="Article Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Breakthroughs in Picosecond Photoacoustic Technology"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              options={BLOG_CATEGORIES.filter(c => c !== 'All Articles')}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Select
              label="Author"
              options={team.map(t => t.name)}
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>
          <Input
            label="Brief Summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="1-2 sentences for card previews..."
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Full Article Body (Markdown supported)
            </label>
            <textarea
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-3 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600 font-sans"
              placeholder="Write the clinical guide content here..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish to Journal
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. EDIT MODAL */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Medical Article"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <Input
            label="Article Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            label="Summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Content
            </label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-3 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Edits
            </Button>
          </div>
        </form>
      </Modal>

      {/* 3. DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => selectedBlog && deleteBlog(selectedBlog.id)}
        title="Delete Journal Post?"
        message={`Confirm deletion of "${selectedBlog?.title}"?`}
      />

    </div>
  );
}
