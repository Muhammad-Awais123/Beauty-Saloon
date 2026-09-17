import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function BlogCard({ blog }) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card card-hover-effect text-left">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="sage" size="sm" className="font-semibold shadow-sm">
            {blog.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-charcoal-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-charcoal-900 group-hover:text-clinic-800 transition-colors line-clamp-2 mb-2 leading-snug">
            <Link to={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </h3>

          <p className="text-xs text-charcoal-600 line-clamp-2 mb-4 leading-relaxed">
            {blog.summary}
          </p>
        </div>

        {/* Author Footer */}
        <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={blog.authorImage || '/images/team/team-doctor-01.jpg'}
              alt={blog.author}
              className="w-6 h-6 rounded-full object-cover border border-charcoal-200"
            />
            <div>
              <p className="text-xs font-semibold text-charcoal-800">{blog.author}</p>
              <p className="text-[10px] text-charcoal-400">{blog.authorRole}</p>
            </div>
          </div>

          <Link
            to={`/blog/${blog.id}`}
            className="text-xs font-semibold text-clinic-700 hover:text-clinic-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
