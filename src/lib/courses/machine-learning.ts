import { Course } from "./types";

export const machineLearningCourse: Course = {
  slug: "machine-learning",
  title: "Machine Learning",
  fee: "45,000",

  shortDescription:
    "Learn Machine Learning from fundamentals to advanced algorithms, covering data preprocessing, supervised and unsupervised learning, model evaluation, and real-world ML projects using Python.",

  overview: [
    "This Machine Learning course provides a comprehensive introduction to the concepts, algorithms, and practical techniques used to build intelligent data-driven systems.",
    "Learners will gain hands-on experience with Python, core ML libraries, data preprocessing, regression, classification, clustering, dimensionality reduction, and ensemble methods.",
    "The course emphasizes real-world datasets, model evaluation, ethical considerations, and deployment basics, preparing learners for ML, data science, and AI-focused roles."
  ],

  duration: "4–5 Months",

  benefits: [
    {
      title: "Strong ML Foundations",
      description:
        "Build a solid understanding of machine learning concepts, algorithms, and workflows."
    },
    {
      title: "Hands-on Python & ML Libraries",
      description:
        "Work with NumPy, Pandas, Matplotlib, and Scikit-learn for ML development."
    },
    {
      title: "Real-World ML Problem Solving",
      description:
        "Apply ML techniques to real datasets and case studies."
    },
    {
      title: "Career-Oriented Skill Development",
      description:
        "Prepare for roles in machine learning, data science, and analytics."
    }
  ],

  whyJoin: [
    {
      title: "Beginner to Intermediate Learning Path",
      description:
        "Start with ML basics and progress to advanced algorithms and ensemble methods."
    },
    {
      title: "Math + Practical Balance",
      description:
        "Understand the mathematics behind ML while focusing on practical implementation."
    },
    {
      title: "Industry-Relevant Techniques",
      description:
        "Learn algorithms widely used in real-world ML systems."
    },
    {
      title: "Project-Based Learning",
      description:
        "Reinforce concepts through hands-on projects and case studies."
    },
    {
      title: "Ethics & Responsible ML",
      description:
        "Understand bias, fairness, and challenges in deploying ML systems."
    },
    {
      title: "ML Deployment Awareness",
      description:
        "Gain exposure to model saving, deployment basics, and MLOps concepts."
    }
  ],

  syllabus: [
    {
      title: "Introduction to Machine Learning",
      topics: [
        "What is machine learning and its applications",
        "Types of learning: supervised and unsupervised",
        "Brief introduction to reinforcement learning",
        "Role of machine learning in AI and data science",
        "Industry applications of machine learning"
      ]
    },
    {
      title: "Mathematics & Statistics for Machine Learning",
      topics: [
        "Linear algebra essentials: vectors and matrices",
        "Probability and statistics fundamentals",
        "Calculus concepts: gradients and optimization",
        "Bias-variance tradeoff"
      ]
    },
    {
      title: "Python Programming & Libraries for ML",
      topics: [
        "Python basics for machine learning",
        "NumPy for numerical computing",
        "Pandas for data manipulation",
        "Matplotlib for data visualization",
        "Introduction to Scikit-learn"
      ]
    },
    {
      title: "Data Preprocessing & Feature Engineering",
      topics: [
        "Data cleaning and handling missing values",
        "Feature scaling and normalization",
        "Feature selection techniques",
        "Feature extraction methods"
      ]
    },
    {
      title: "Supervised Learning: Regression Methods",
      topics: [
        "Simple linear regression",
        "Multiple linear regression",
        "Cost functions",
        "Gradient descent optimization",
        "Polynomial regression and model tuning"
      ]
    },
    {
      title: "Supervised Learning: Classification Algorithms",
      topics: [
        "Logistic regression",
        "K-nearest neighbors (KNN)",
        "Support Vector Machines (SVM)",
        "Decision trees",
        "Naive Bayes classification"
      ]
    },
    {
      title: "Model Evaluation, Validation & Selection",
      topics: [
        "Train-test split techniques",
        "Cross-validation",
        "Confusion matrix",
        "Precision, recall, and F1-score",
        "ROC curve and AUC"
      ]
    },
    {
      title: "Unsupervised Learning: Clustering Techniques",
      topics: [
        "K-means clustering",
        "Hierarchical clustering",
        "DBSCAN algorithm",
        "Cluster validation techniques"
      ]
    },
    {
      title: "Unsupervised Learning: Dimensionality Reduction",
      topics: [
        "Principal Component Analysis (PCA)",
        "t-SNE and dimensionality reduction techniques",
        "Curse of dimensionality"
      ]
    },
    {
      title: "Ensemble Methods & Advanced Supervised Learning",
      topics: [
        "Bagging techniques",
        "Random Forests",
        "Boosting algorithms",
        "AdaBoost and Gradient Boosting",
        "Handling imbalanced datasets"
      ]
    },
    {
      title: "Introduction to Neural Networks",
      topics: [
        "Basics of neural networks",
        "Perceptrons",
        "Multi-layer neural networks",
        "Introduction to deep learning concepts"
      ]
    },
    {
      title: "Practical Machine Learning Projects & Case Studies",
      topics: [
        "Implementing ML models on real datasets",
        "End-to-end machine learning workflow",
        "Problem statements and group presentations"
      ]
    },
    {
      title: "Industry Tools & ML Deployment Basics",
      topics: [
        "Using Jupyter Notebook and Google Colab",
        "Saving and loading trained models",
        "Basic model deployment concepts",
        "Overview of cloud platforms and MLOps basics"
      ]
    },
    {
      title: "Ethics, Challenges & Emerging Trends in ML",
      topics: [
        "Ethics in machine learning",
        "Bias and fairness challenges",
        "Model explainability",
        "Emerging trends such as AutoML",
        "Scalable machine learning systems"
      ]
    }
  ],

  cardImage: "/machine-learning.png"
};
