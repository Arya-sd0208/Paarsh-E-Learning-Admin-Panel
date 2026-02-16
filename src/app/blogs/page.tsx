import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const allBlogPosts = [...blogPosts, ...blogPosts.map(p => ({...p, id: `${p.id}-2`}))];

  return (
    <div className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">From Our Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest industry trends and learning tips.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col bg-background overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="font-headline text-xl leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" asChild className="p-0">
                  <Link href={`/blogs/${post.id}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
