import { Fade } from 'react-awesome-reveal';



const blogs = [
  {
    image: "https://i.ibb.co.com/3CcHt4J/marketing-ideas-share-research-planning-concept-53876-127431.jpg", 
    title: "Free advertising for your online business",
    author: "Musharof Chy",
    date: "05 Dec, 2024",
    category: "Blog",
  },
  {
    image: "https://i.ibb.co.com/6Z3np1Q/good-looking-young-entrepreneur-designer-with-dark-hair-striped-shirt-talking-phone-with-customer-di.jpg", 
    title: "9 simple ways to improve your design skills",
    author: "Jhon Doe",
    date: "03 Dec, 2024",
    category: "Blog",
  },
  {
    image: "https://i.ibb.co.com/5TJypXD/programming-background-with-person-working-with-codes-computer-23-2150010129.jpg", 
    title: "Tips to quickly improve your coding speed",
    author: "Ming Yue",
    date: "01 Dec, 2024",
    category: "Blog",
  },
];

const BlogCard = ({ image, title, author, date, category }) => {
  return (
    <Fade triggerOnce={true} delay={400}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <p className="text-sm text-[#4E6BFF] font-medium mb-2">{category}</p>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-200">
            {title}
          </h3>
          <button className="text-[#4E6BFF] hover:underline mb-4">Read More</button>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <span className="material-icons text-base mr-1">person</span>
              {author}
            </div>
            <div className="flex items-center">
              <span className="material-icons text-base mr-1">calendar_today</span>
              {date}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

const BlogsSection = () => {
  return (
    <section className="my-16 w-[80%] mx-auto px-4 lg:px-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
          Latest Blogs & News
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Stay Updated with Insights, Trends, and Stories.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
