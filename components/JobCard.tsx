import * as React from 'react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  interviews: {
    difficulty: '简单' | '中等' | '困难';
    rating: number;
    questions: string[];
    experience: string;
  };
}

export default function JobCard({ title, company, location, salary, description, interviews }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">{company}</p>
          <p className="text-gray-500">{location}</p>
        </div>
        <div className="text-orange-500 font-bold">{salary}</div>
      </div>
      <p className="mt-4 text-gray-700">{description}</p>
      
      {/* 新增面试信息部分 */}
      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">面试信息</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-gray-600">难度：</span>
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              interviews.difficulty === '困难' ? 'bg-red-100 text-red-800' :
              interviews.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {interviews.difficulty}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600">面试评分：</span>
            <span className="ml-2 text-orange-500">
              {'★'.repeat(interviews.rating)}{'☆'.repeat(5 - interviews.rating)}
            </span>
          </div>

          <div>
            <h4 className="text-gray-600 mb-1">常见面试题：</h4>
            <ul className="list-disc list-inside text-gray-700">
              {interviews.questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-600 mb-1">面试体验：</h4>
            <p className="text-gray-700">{interviews.experience}</p>
          </div>
        </div>
      </div>

      <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
        申请职位
      </button>
    </div>
  );
} 