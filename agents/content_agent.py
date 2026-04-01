def generate_content(fact sheet: dict) :
  return {
    "blog":
    f"{fact_sheet['product_name']} is and AI powered platform that {fact_sheet['value proposition']}. It helps {','.join(fact_sheet['target_audience'])} streamline content creation and maintain consistency across multiple platforms. By reducing repetitive work, it enables faster product launches and improved communication.",
    "thread" : [
      f" Introducing {fact_sheet['product_name']}", 
      "Struggling with repetitive tasks?",
      "One input -> Blog, social media and email",
      "Stay consistent across all platforms",
      "Create faster. Work smarter."
    ],
    "email" : f"Discover how {fact_sheet['product_name']} can automate your content workflow and ensure consistent messaging across evry platform."
  }
                                                                    
