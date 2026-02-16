import { blogPosts } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id.replace('-2', ''));

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/blogs">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>
                <article className="bg-background rounded-lg shadow-lg overflow-hidden p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">{post.title}</h1>
                    <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By {post.author}</span>
                    </div>
                    </div>
                    <div className="relative aspect-video mt-8 rounded-lg overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.imageHint}
                    />
                    </div>
                    <div className="text-lg text-foreground mt-8 space-y-6">
                        <p className="font-semibold text-xl">{post.excerpt}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>
                        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. </p>
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                            "The journey of a thousand miles begins with a single step." - Lao Tzu
                        </blockquote>
                        <p>Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. </p>
                    </div>
                </article>
            </div>
        </div>
    </div>
  );
}
