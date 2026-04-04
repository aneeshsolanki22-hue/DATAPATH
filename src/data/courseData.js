// DATAPATH — Course Data
// 27 Sections | Exercises excluded | Each named concept = 1 topic
// skill tags: 'python' | 'numpy' | 'pandas' | 'datawork' | 'statistics' | 'visualization' | 'projects' | 'foundations'

export const courseData = [
  {
    id: 's1', number: 1, title: 'Introduction to the Course',
    totalLectures: 4, duration: '21min', skill: 'foundations',
    topics: [
      { id: 's1-t1', title: 'A Practical Example - What Will You Learn?', duration: '4:46' },
      { id: 's1-t2', title: 'What Does the Course Cover?', duration: '5:36' },
      { id: 's1-t3', title: 'Download All Resources', duration: '0:15' },
      { id: 's1-t4', title: 'FAQ', duration: '10:29' },
    ]
  },
  {
    id: 's2', number: 2, title: 'Introduction to Data Analytics',
    totalLectures: 5, duration: '22min', skill: 'foundations',
    topics: [
      { id: 's2-t1', title: 'Introduction to the World of Business and Data', duration: '2:26' },
      { id: 's2-t2', title: 'Relevant Terms Explained', duration: '5:45' },
      { id: 's2-t3', title: 'Data Analyst Compared to Other Data Jobs', duration: '2:27' },
      { id: 's2-t4', title: 'Data Analyst Job Description', duration: '5:42' },
      { id: 's2-t5', title: 'Why Python', duration: '5:42' },
    ]
  },
  {
    id: 's3', number: 3, title: 'Setting up the Environment',
    totalLectures: 9, duration: '39min', skill: 'foundations',
    topics: [
      { id: 's3-t1', title: 'Introduction', duration: '1:24' },
      { id: 's3-t2', title: 'Programming Explained in a Few Minutes', duration: '5:29' },
      { id: 's3-t3', title: 'Jupyter - Introduction', duration: '3:28' },
      { id: 's3-t4', title: 'Jupyter - Installing Anaconda', duration: '3:35' },
      { id: 's3-t5', title: 'Jupyter - Intro to Using Jupyter', duration: '4:53' },
      { id: 's3-t6', title: 'Jupyter - Working with Notebook Files', duration: '4:30' },
      { id: 's3-t7', title: 'Jupyter - Using Shortcuts', duration: '7:24' },
      { id: 's3-t8', title: 'Jupyter - Handling Error Messages', duration: '5:52' },
      { id: 's3-t9', title: 'Jupyter - Restarting the Kernel', duration: '2:03' },
    ]
  },
  {
    id: 's4', number: 4, title: 'Python Basics',
    totalLectures: 39, duration: '2hr 1min', skill: 'python',
    topics: [
      { id: 's4-t1', title: 'Python Variables', duration: '3:37' },
      { id: 's4-t2', title: 'Types of Data - Numbers and Boolean Values', duration: '3:05' },
      { id: 's4-t3', title: 'Types of Data - Strings', duration: '5:40' },
      { id: 's4-t4', title: 'Introduction to Anaconda AI', duration: '2:27' },
      { id: 's4-t5', title: 'Using the Anaconda Assistant: Strings', duration: '4:07' },
      { id: 's4-t6', title: 'Basic Python Syntax - Arithmetic Operators', duration: '3:23' },
      { id: 's4-t7', title: 'Basic Python Syntax - The Double Equality Sign', duration: '1:33' },
      { id: 's4-t8', title: 'Basic Python Syntax - Reassign Values', duration: '1:08' },
      { id: 's4-t9', title: 'Basic Python Syntax - Add Comments', duration: '1:34' },
      { id: 's4-t10', title: 'Basic Python Syntax - Line Continuation', duration: '0:49' },
      { id: 's4-t11', title: 'Basic Python Syntax - Indexing Elements', duration: '1:18' },
      { id: 's4-t12', title: 'Basic Python Syntax - Indentation', duration: '1:44' },
      { id: 's4-t13', title: 'Operators - Comparison Operators', duration: '2:10' },
      { id: 's4-t14', title: 'Operators - Logical and Identity Operators', duration: '5:35' },
      { id: 's4-t15', title: 'Conditional Statements - The IF Statement', duration: '3:01' },
      { id: 's4-t16', title: 'Conditional Statements - The ELSE Statement', duration: '2:45' },
      { id: 's4-t17', title: 'Conditional Statements - The ELIF Statement', duration: '5:34' },
      { id: 's4-t18', title: 'Conditional Statements - A Note on Boolean Values', duration: '2:13' },
      { id: 's4-t19', title: 'Functions - Defining a Function in Python', duration: '2:02' },
      { id: 's4-t20', title: 'Functions - Creating a Function with a Parameter', duration: '3:49' },
      { id: 's4-t21', title: 'Functions - Another Way to Define a Function', duration: '2:36' },
      { id: 's4-t22', title: 'Functions - Using a Function in Another Function', duration: '1:49' },
      { id: 's4-t23', title: 'Functions - Combining Conditional Statements and Functions', duration: '3:06' },
      { id: 's4-t24', title: 'Functions - Creating Functions with Few Arguments', duration: '1:17' },
      { id: 's4-t25', title: 'Functions - Notable Built-in Functions in Python', duration: '3:56' },
      { id: 's4-t26', title: 'Sequences - Lists', duration: '4:02' },
      { id: 's4-t27', title: 'Sequences - Using Methods', duration: '3:19' },
      { id: 's4-t28', title: 'Sequences - List Slicing', duration: '4:31' },
      { id: 's4-t29', title: 'Sequences - Tuples', duration: '3:11' },
      { id: 's4-t30', title: 'Sequences - Dictionaries', duration: '4:04' },
      { id: 's4-t31', title: 'Iteration - For Loops', duration: '2:56' },
      { id: 's4-t32', title: 'Iteration - While Loops and Incrementing', duration: '2:26' },
      { id: 's4-t33', title: 'Iteration - Create Lists with the range() Function', duration: '3:49' },
      { id: 's4-t34', title: 'Iteration - Use Conditional Statements and Loops Together', duration: '3:11' },
      { id: 's4-t35', title: 'Iteration - Conditional Statements, Functions, and Loops', duration: '2:27' },
      { id: 's4-t36', title: 'Using the Anaconda Assistant: Several Python Tools', duration: '5:56' },
      { id: 's4-t37', title: 'Iteration - Iterating over Dictionaries', duration: '3:07' },
      { id: 's4-t38', title: 'Using the Anaconda Assistant: Dictionaries', duration: '2:22' },
    ]
  },
  {
    id: 's5', number: 5, title: 'Fundamentals for Coding in Python',
    totalLectures: 6, duration: '32min', skill: 'python',
    topics: [
      { id: 's5-t1', title: 'Object-Oriented Programming (OOP)', duration: '5:00' },
      { id: 's5-t2', title: 'Modules, Packages, and the Python Standard Library', duration: '4:24' },
      { id: 's5-t3', title: 'Importing Modules', duration: '3:24' },
      { id: 's5-t4', title: 'Introduction to Using NumPy and pandas', duration: '9:09' },
      { id: 's5-t5', title: 'What is Software Documentation?', duration: '3:57' },
      { id: 's5-t6', title: 'The Python Documentation', duration: '6:23' },
    ]
  },
  {
    id: 's6', number: 6, title: 'Mathematics for Python',
    totalLectures: 11, duration: '51min', skill: 'numpy',
    topics: [
      { id: 's6-t1', title: 'What Is a Matrix?', duration: '3:37' },
      { id: 's6-t2', title: 'Scalars and Vectors', duration: '2:58' },
      { id: 's6-t3', title: 'Linear Algebra and Geometry', duration: '3:06' },
      { id: 's6-t4', title: 'Arrays in Python', duration: '5:09' },
      { id: 's6-t5', title: 'What Is a Tensor?', duration: '3:00' },
      { id: 's6-t6', title: 'Adding and Subtracting Matrices', duration: '3:36' },
      { id: 's6-t7', title: 'Errors When Adding Matrices', duration: '2:01' },
      { id: 's6-t8', title: 'Transpose', duration: '5:13' },
      { id: 's6-t9', title: 'Dot Product of Vectors', duration: '3:48' },
      { id: 's6-t10', title: 'Dot Product of Matrices', duration: '8:23' },
      { id: 's6-t11', title: 'Why is Linear Algebra Useful', duration: '10:10' },
    ]
  },
  {
    id: 's7', number: 7, title: 'NumPy Basics',
    totalLectures: 6, duration: '20min', skill: 'numpy',
    topics: [
      { id: 's7-t1', title: 'The NumPy Package and Why We Use It', duration: '4:03' },
      { id: 's7-t2', title: 'Installing/Upgrading NumPy', duration: '2:01' },
      { id: 's7-t3', title: 'Ndarray', duration: '3:06' },
      { id: 's7-t4', title: 'The NumPy Documentation', duration: '4:42' },
      { id: 's7-t5', title: 'Python Coding Exercises - Part II', duration: '5:35' },
    ]
  },
  {
    id: 's8', number: 8, title: 'Pandas - Basics',
    totalLectures: 17, duration: '1hr 22min', skill: 'pandas',
    topics: [
      { id: 's8-t1', title: 'Introduction to the pandas Library', duration: '5:41' },
      { id: 's8-t2', title: 'Installing and Running pandas', duration: '5:57' },
      { id: 's8-t3', title: 'Introduction to pandas Series', duration: '8:41' },
      { id: 's8-t4', title: 'Working with Attributes in Python', duration: '5:22' },
      { id: 's8-t5', title: 'Using an Index in pandas', duration: '4:00' },
      { id: 's8-t6', title: 'Label-based vs Position-based Indexing', duration: '4:31' },
      { id: 's8-t7', title: 'More on Working with Indices in Python', duration: '5:37' },
      { id: 's8-t8', title: 'Using Methods in Python - Part I', duration: '4:55' },
      { id: 's8-t9', title: 'Using Methods in Python - Part II', duration: '2:36' },
      { id: 's8-t10', title: 'Parameters vs Arguments', duration: '4:35' },
      { id: 's8-t11', title: 'The pandas Documentation', duration: '9:54' },
      { id: 's8-t12', title: 'Introduction to pandas DataFrames', duration: '5:23' },
      { id: 's8-t13', title: 'Creating DataFrames from Scratch - Part I', duration: '5:56' },
      { id: 's8-t14', title: 'Creating DataFrames from Scratch - Part II', duration: '5:03' },
      { id: 's8-t15', title: 'Additional Notes on Using DataFrames', duration: '1:58' },
      { id: 's8-t16', title: 'pandas Basics - Conclusion', duration: '0:44' },
    ]
  },
  {
    id: 's9', number: 9, title: 'Working with Text Files',
    totalLectures: 30, duration: '1hr 59min', skill: 'datawork',
    topics: [
      { id: 's9-t1', title: 'Working with Files in Python - An Introduction', duration: '3:46' },
      { id: 's9-t2', title: 'File vs File Object, Read vs Parse', duration: '2:52' },
      { id: 's9-t3', title: 'Structured vs Semi-Structured and Unstructured Data', duration: '3:10' },
      { id: 's9-t4', title: 'Data Connectivity through Text Files', duration: '3:06' },
      { id: 's9-t5', title: 'Principles of Importing Data in Python', duration: '4:50' },
      { id: 's9-t6', title: 'More on Text Files (*.txt vs *.csv)', duration: '4:33' },
      { id: 's9-t7', title: 'Fixed-width Files', duration: '1:26' },
      { id: 's9-t8', title: 'Common Naming Conventions Used in Programming', duration: '3:49' },
      { id: 's9-t9', title: 'Importing Text Files in Python — open()', duration: '9:00' },
      { id: 's9-t10', title: 'Importing Text Files in Python — with open()', duration: '4:53' },
      { id: 's9-t11', title: 'Importing *.csv Files with pandas - Part I', duration: '5:35' },
      { id: 's9-t12', title: 'Importing *.csv Files with pandas - Part II', duration: '2:37' },
      { id: 's9-t13', title: 'Importing *.csv Files with pandas - Part III', duration: '5:57' },
      { id: 's9-t14', title: 'Importing Data with the "index_col" Parameter', duration: '2:35' },
      { id: 's9-t15', title: 'Importing Data with NumPy - .loadtxt() vs genfromtxt()', duration: '10:43' },
      { id: 's9-t16', title: 'Importing Data with NumPy - Partial Cleaning While Importing', duration: '7:21' },
      { id: 's9-t17', title: 'A Note on Using the NumPy .genfromtxt() Function', duration: '1:06' },
      { id: 's9-t18', title: 'Importing *.json Files', duration: '5:14' },
      { id: 's9-t19', title: 'Prelude to Working with Excel Files in Python', duration: '3:40' },
      { id: 's9-t20', title: 'Working with Excel Data (the *.xlsx Format)', duration: '1:55' },
      { id: 's9-t21', title: 'An Important Exercise on Importing Data in Python', duration: '5:44' },
      { id: 's9-t22', title: "Importing Data with the pandas' Squeeze Method", duration: '3:23' },
      { id: 's9-t23', title: 'A Note on Importing Files in Jupyter', duration: '3:10' },
      { id: 's9-t24', title: 'Saving Your Data with pandas', duration: '3:11' },
      { id: 's9-t25', title: 'Saving Your Data with NumPy - np.save()', duration: '5:23' },
      { id: 's9-t26', title: 'Saving Your Data with NumPy - np.savez()', duration: '5:12' },
      { id: 's9-t27', title: 'Saving Your Data with NumPy - np.savetxt()', duration: '3:58' },
      { id: 's9-t28', title: 'Working with Text Files - Conclusion', duration: '0:42' },
    ]
  },
  {
    id: 's10', number: 10, title: 'Working with Text Data',
    totalLectures: 6, duration: '41min', skill: 'python',
    topics: [
      { id: 's10-t1', title: 'Working with Text Data and Argument Specifiers', duration: '9:18' },
      { id: 's10-t2', title: 'Manipulating Python Strings', duration: '4:13' },
      { id: 's10-t3', title: 'Using Various Python String Methods - Part I', duration: '6:51' },
      { id: 's10-t4', title: 'Using Various Python String Methods - Part II', duration: '6:44' },
      { id: 's10-t5', title: 'String Accessors', duration: '4:49' },
      { id: 's10-t6', title: 'Using the .format() Method', duration: '9:02' },
    ]
  },
  {
    id: 's11', number: 11, title: 'Must-Know Python Tools',
    totalLectures: 5, duration: '31min', skill: 'python',
    topics: [
      { id: 's11-t1', title: 'Iterating Over Range Objects', duration: '4:17' },
      { id: 's11-t2', title: 'Nested For Loops - Introduction', duration: '5:59' },
      { id: 's11-t3', title: 'Triple Nested For Loops', duration: '5:37' },
      { id: 's11-t4', title: 'List Comprehensions', duration: '8:30' },
      { id: 's11-t5', title: 'Anonymous (Lambda) Functions', duration: '7:00' },
    ]
  },
  {
    id: 's12', number: 12, title: 'Data Gathering / Data Collection',
    totalLectures: 1, duration: '7min', skill: 'datawork',
    topics: [
      { id: 's12-t1', title: 'What is Data Gathering/Data Collection?', duration: '6:32' },
    ]
  },
  {
    id: 's13', number: 13, title: 'APIs',
    totalLectures: 11, duration: '35min', skill: 'datawork',
    topics: [
      { id: 's13-t1', title: 'Overview of APIs', duration: '3:10' },
      { id: 's13-t2', title: 'GET and POST Requests', duration: '2:35' },
      { id: 's13-t3', title: 'Data Exchange Format for APIs: JSON', duration: '2:24' },
      { id: 's13-t4', title: 'Introducing the Exchange Rates API', duration: '6:00' },
      { id: 's13-t5', title: 'Including Parameters in a GET Request', duration: '4:31' },
      { id: 's13-t6', title: 'More Functionalities of the Exchange Rates API', duration: '4:37' },
      { id: 's13-t7', title: 'Coding a Simple Currency Conversion Calculator', duration: '4:57' },
      { id: 's13-t8', title: 'iTunes API', duration: '4:12' },
      { id: 's13-t9', title: 'iTunes API: Structuring and Exporting the Data', duration: '1:59' },
    ]
  },
  {
    id: 's14', number: 14, title: 'Data Cleaning and Data Preprocessing',
    totalLectures: 1, duration: '5min', skill: 'datawork',
    topics: [
      { id: 's14-t1', title: 'Data Cleaning and Data Preprocessing', duration: '5:27' },
    ]
  },
  {
    id: 's15', number: 15, title: 'pandas Series',
    totalLectures: 5, duration: '22min', skill: 'pandas',
    topics: [
      { id: 's15-t1', title: '.unique(), .nunique()', duration: '3:49' },
      { id: 's15-t2', title: 'Converting Series into Arrays', duration: '5:29' },
      { id: 's15-t3', title: '.sort_values()', duration: '3:58' },
      { id: 's15-t4', title: 'Attribute and Method Chaining', duration: '4:21' },
      { id: 's15-t5', title: '.sort_index()', duration: '3:59' },
    ]
  },
  {
    id: 's16', number: 16, title: 'pandas DataFrames',
    totalLectures: 7, duration: '43min', skill: 'pandas',
    topics: [
      { id: 's16-t1', title: 'A Revision to pandas DataFrames', duration: '5:05' },
      { id: 's16-t2', title: 'Using the Anaconda Assistant: Importing Data with pandas', duration: '4:41' },
      { id: 's16-t3', title: 'Common Attributes for Working with DataFrames', duration: '4:15' },
      { id: 's16-t4', title: 'Data Selection in pandas DataFrames', duration: '6:55' },
      { id: 's16-t5', title: 'Data Selection - Indexing with .iloc[]', duration: '5:56' },
      { id: 's16-t6', title: 'Data Selection - Indexing with .loc[]', duration: '4:01' },
      { id: 's16-t7', title: 'A Few Comments on Using .loc[] and .iloc[]', duration: '11:40' },
    ]
  },
  {
    id: 's17', number: 17, title: 'NumPy Fundamentals',
    totalLectures: 7, duration: '29min', skill: 'numpy',
    topics: [
      { id: 's17-t1', title: 'Indexing in NumPy', duration: '5:51' },
      { id: 's17-t2', title: 'Assigning Values in NumPy', duration: '4:16' },
      { id: 's17-t3', title: 'Elementwise Properties of Arrays', duration: '4:29' },
      { id: 's17-t4', title: 'Types of Data Supported by NumPy', duration: '5:56' },
      { id: 's17-t5', title: 'Characteristics of NumPy Functions Part 1', duration: '4:43' },
      { id: 's17-t6', title: 'Characteristics of NumPy Functions Part 2', duration: '3:30' },
    ]
  },
  {
    id: 's18', number: 18, title: 'NumPy DataTypes',
    totalLectures: 4, duration: '24min', skill: 'numpy',
    topics: [
      { id: 's18-t1', title: 'ndarrays', duration: '9:52' },
      { id: 's18-t2', title: 'Arrays vs Lists', duration: '6:55' },
      { id: 's18-t3', title: 'Strings vs Object vs Number', duration: '7:14' },
    ]
  },
  {
    id: 's19', number: 19, title: 'Working with Arrays',
    totalLectures: 5, duration: '27min', skill: 'numpy',
    topics: [
      { id: 's19-t1', title: 'Basic Slicing in NumPy', duration: '10:04' },
      { id: 's19-t2', title: 'Stepwise Slicing in NumPy', duration: '4:58' },
      { id: 's19-t3', title: 'Conditional Slicing in NumPy', duration: '4:51' },
      { id: 's19-t4', title: 'Dimensions and the Squeeze Function', duration: '6:52' },
    ]
  },
  {
    id: 's20', number: 20, title: 'Generating Data with NumPy',
    totalLectures: 8, duration: '33min', skill: 'numpy',
    topics: [
      { id: 's20-t1', title: 'Arrays of 0s and 1s', duration: '5:32' },
      { id: 's20-t2', title: '"_like" Functions in NumPy', duration: '3:13' },
      { id: 's20-t3', title: 'A Non-Random Sequence of Numbers', duration: '5:02' },
      { id: 's20-t4', title: 'Random Generators and Seeds', duration: '5:21' },
      { id: 's20-t5', title: 'Basic Random Functions in NumPy', duration: '3:56' },
      { id: 's20-t6', title: 'Probability Distributions in NumPy', duration: '5:19' },
      { id: 's20-t7', title: 'Applications of Random Data in NumPy', duration: '4:09' },
    ]
  },
  {
    id: 's21', number: 21, title: 'Statistics with NumPy',
    totalLectures: 9, duration: '43min', skill: 'statistics',
    topics: [
      { id: 's21-t1', title: 'Using Statistical Functions in NumPy', duration: '7:44' },
      { id: 's21-t2', title: 'Minimal and Maximal Values in NumPy', duration: '6:02' },
      { id: 's21-t3', title: 'Statistical Order Functions in NumPy', duration: '6:25' },
      { id: 's21-t4', title: 'Averages and Variance in NumPy', duration: '4:17' },
      { id: 's21-t5', title: 'Covariance and Correlation in NumPy', duration: '2:59' },
      { id: 's21-t6', title: 'Histograms in NumPy (Part 1)', duration: '7:36' },
      { id: 's21-t7', title: 'Histograms in NumPy (Part 2)', duration: '4:15' },
      { id: 's21-t8', title: 'NAN Equivalent Functions in NumPy', duration: '3:08' },
    ]
  },
  {
    id: 's22', number: 22, title: 'NumPy - Preprocessing',
    totalLectures: 13, duration: '1hr 35min', skill: 'numpy',
    topics: [
      { id: 's22-t1', title: 'Checking for Missing Values in Ndarrays', duration: '9:23' },
      { id: 's22-t2', title: 'Substituting Missing Values in Ndarrays', duration: '8:29' },
      { id: 's22-t3', title: 'Reshaping Ndarrays', duration: '6:31' },
      { id: 's22-t4', title: 'Removing Values from Ndarrays', duration: '4:20' },
      { id: 's22-t5', title: 'Sorting Ndarrays', duration: '9:45' },
      { id: 's22-t6', title: 'Argument Sort in NumPy', duration: '5:48' },
      { id: 's22-t7', title: 'Argument Where in NumPy', duration: '11:12' },
      { id: 's22-t8', title: 'Shuffling Ndarrays', duration: '6:51' },
      { id: 's22-t9', title: 'Casting Ndarrays', duration: '6:14' },
      { id: 's22-t10', title: 'Striping Values from Ndarrays', duration: '4:43' },
      { id: 's22-t11', title: 'Stacking Ndarrays', duration: '10:31' },
      { id: 's22-t12', title: 'Concatenating Ndarrays', duration: '6:27' },
      { id: 's22-t13', title: 'Finding Unique Values in Ndarrays', duration: '5:04' },
    ]
  },
  {
    id: 's23', number: 23, title: 'A Loan Data Example with NumPy',
    totalLectures: 15, duration: '1hr 28min', skill: 'projects',
    topics: [
      { id: 's23-t1', title: 'Setting Up: Introduction to the Practical Example', duration: '4:50' },
      { id: 's23-t2', title: 'Setting Up: Importing the Data Set', duration: '4:10' },
      { id: 's23-t3', title: 'Setting Up: Checking for Incomplete Data', duration: '4:35' },
      { id: 's23-t4', title: 'Setting Up: Splitting the Dataset', duration: '5:27' },
      { id: 's23-t5', title: 'Setting Up: Creating Checkpoints', duration: '2:50' },
      { id: 's23-t6', title: 'Manipulating Text Data: Issue Date', duration: '5:26' },
      { id: 's23-t7', title: 'Manipulating Text Data: Loan Status and Term', duration: '7:08' },
      { id: 's23-t8', title: 'Manipulating Text Data: Grade and Sub Grade', duration: '8:54' },
      { id: 's23-t9', title: 'Manipulating Text Data: Verification Status & URL', duration: '5:20' },
      { id: 's23-t10', title: 'Manipulating Text Data: State Address', duration: '6:01' },
      { id: 's23-t11', title: 'Manipulating Text Data: Converting Strings & Checkpoint', duration: '3:28' },
      { id: 's23-t12', title: 'Manipulating Numeric Data: Substitute Filler Values', duration: '7:51' },
      { id: 's23-t13', title: 'Manipulating Numeric Data: Currency Change – Exchange Rate', duration: '6:32' },
      { id: 's23-t14', title: 'Manipulating Numeric Data: Currency Change - USD to EUR', duration: '8:22' },
      { id: 's23-t15', title: 'Completing the Dataset', duration: '6:46' },
    ]
  },
  {
    id: 's24', number: 24, title: 'The "Absenteeism" Exercise - Introduction',
    totalLectures: 3, duration: '5min', skill: 'projects',
    topics: [
      { id: 's24-t1', title: 'An Introduction to the "Absenteeism" Exercise', duration: '1:11' },
      { id: 's24-t2', title: 'The "Absenteeism" Exercise from a Business Perspective', duration: '2:19' },
      { id: 's24-t3', title: 'The Dataset', duration: '1:34' },
    ]
  },
  {
    id: 's25', number: 25, title: 'Solution to the "Absenteeism" Exercise',
    totalLectures: 18, duration: '1hr 18min', skill: 'projects',
    topics: [
      { id: 's25-t1', title: 'How to Complete the Absenteeism Exercise', duration: '1:57' },
      { id: 's25-t2', title: 'Eyeball Your Data First', duration: '5:53' },
      { id: 's25-t3', title: "Note: Programming vs the Rest of the World", duration: '3:27' },
      { id: 's25-t4', title: 'Using a Statistical Approach to Solve Our Exercise', duration: '2:17' },
      { id: 's25-t5', title: "Dropping the 'ID' Column", duration: '6:27' },
      { id: 's25-t6', title: "Analysis of the 'Reason for Absence' Column", duration: '5:04' },
      { id: 's25-t7', title: 'Splitting the Reasons for Absence into Dummy Variables', duration: '8:37' },
      { id: 's25-t8', title: 'Working with Dummy Variables - A Statistical Perspective', duration: '1:28' },
      { id: 's25-t9', title: 'Grouping the Reason for Absence Columns', duration: '8:35' },
      { id: 's25-t10', title: 'Concatenating Columns in a pandas DataFrame', duration: '4:35' },
      { id: 's25-t11', title: 'Reordering Columns in a DataFrame', duration: '1:43' },
      { id: 's25-t12', title: 'Creating Checkpoints', duration: '0:08' },
      { id: 's25-t13', title: "Working on the 'Date' Column", duration: '7:49' },
      { id: 's25-t14', title: "Extracting the Month Value from the 'Date' Column", duration: '7:00' },
      { id: 's25-t15', title: "Creating the 'Day of the Week' Column", duration: '3:36' },
      { id: 's25-t16', title: 'Understanding the Meaning of 5 More Columns', duration: '3:17' },
      { id: 's25-t17', title: "Modifying the 'Education' Column", duration: '4:38' },
      { id: 's25-t18', title: 'Final Remarks on the Absenteeism Exercise', duration: '1:40' },
    ]
  },
  {
    id: 's26', number: 26, title: 'Data Visualization',
    totalLectures: 37, duration: '2hr 55min', skill: 'visualization',
    topics: [
      { id: 's26-t1', title: 'What Is Data Visualization and Why Is It Important?', duration: '4:31' },
      { id: 's26-t2', title: 'Why Learn Data Visualization?', duration: '6:08' },
      { id: 's26-t3', title: 'Choosing the Right Visualization – Approaches and Frameworks', duration: '6:58' },
      { id: 's26-t4', title: 'Introduction into Colors and Color Theory', duration: '8:56' },
      { id: 's26-t5', title: 'Bar Chart - Theory and Dataset', duration: '1:29' },
      { id: 's26-t6', title: 'How to Create a Bar Chart Using Python', duration: '11:27' },
      { id: 's26-t7', title: 'Interpreting and Making a Good Bar Chart', duration: '2:50' },
      { id: 's26-t8', title: 'Pie Chart - Theory and Dataset', duration: '4:04' },
      { id: 's26-t9', title: 'How to Create a Pie Chart Using Python', duration: '6:39' },
      { id: 's26-t10', title: 'Interpreting the Pie Chart', duration: '1:32' },
      { id: 's26-t11', title: 'Why You Should Never Create a Pie Graph', duration: '7:32' },
      { id: 's26-t12', title: 'Stacked Area Chart - Theory and Dataset', duration: '3:16' },
      { id: 's26-t13', title: 'How to Create a Stacked Area Chart Using Python', duration: '7:48' },
      { id: 's26-t14', title: 'Interpreting and Making a Good Stacked Area Chart', duration: '6:22' },
      { id: 's26-t15', title: 'Line Chart - Theory and Dataset', duration: '2:03' },
      { id: 's26-t16', title: 'How to Create a Line Chart in Python', duration: '8:05' },
      { id: 's26-t17', title: 'Interpreting and Making a Good Line Chart', duration: '9:41' },
      { id: 's26-t18', title: 'Histogram - Theory and Dataset', duration: '4:39' },
      { id: 's26-t19', title: 'How to Create a Histogram Using Python', duration: '5:43' },
      { id: 's26-t20', title: 'Interpreting the Histogram', duration: '2:11' },
      { id: 's26-t21', title: 'Choosing the Number of Bins in a Histogram', duration: '5:28' },
      { id: 's26-t22', title: 'How to Make a Good Histogram', duration: '4:43' },
      { id: 's26-t23', title: 'Scatter Plot - Theory and Dataset', duration: '2:29' },
      { id: 's26-t24', title: 'How to Create a Scatter Plot Using Python', duration: '8:39' },
      { id: 's26-t25', title: 'Interpreting and Making a Good Scatter Plot', duration: '5:38' },
      { id: 's26-t26', title: 'Regression Plot - Theory and Dataset', duration: '3:03' },
      { id: 's26-t27', title: 'How to Create a Regression Scatter Plot Using Python', duration: '7:08' },
      { id: 's26-t28', title: 'Interpreting and Making a Good Regression Plot', duration: '7:50' },
      { id: 's26-t29', title: 'Combination Bar and Line Chart - Theory and Dataset', duration: '3:10' },
      { id: 's26-t30', title: 'How to Create a Combination Bar and Line Graph Using Python', duration: '7:39' },
      { id: 's26-t31', title: 'Interpreting and Making a Good Combination Chart', duration: '6:40' },
    ]
  },
  {
    id: 's27', number: 27, title: 'Conclusion',
    totalLectures: 2, duration: '3min', skill: 'foundations',
    topics: [
      { id: 's27-t1', title: 'Conclusion', duration: '2:22' },
      { id: 's27-t2', title: 'Bonus', duration: '0:29' },
    ]
  },
]

// Skill radar mapping — sections per skill
export const skillSections = {
  Python:        ['s4', 's5', 's10', 's11'],
  NumPy:         ['s6', 's7', 's17', 's18', 's19', 's20', 's21', 's22'],
  Pandas:        ['s8', 's15', 's16'],
  Statistics:    ['s21', 's22'],
  Visualization: ['s26'],
  Projects:      ['s23', 's24', 's25'],
}

// Course summary stats
export const courseSummary = {
  totalSections: 27,
  totalLectures: 284,
  totalDuration: '21h 29m',
  title: 'The Complete Data Analyst Bootcamp',
}
