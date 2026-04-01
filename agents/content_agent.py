def generate_content(fact_sheet: dict):
    return {
        "blog": f"{fact_sheet['product_name']} is an AI-powered platform that {fact_sheet['value_proposition']}. It helps {', '.join(fact_sheet['target_audience'])} streamline content creation and maintain consistency across multiple platforms. By reducing repetitive work, it enables faster product launches and improved communication.",
        
        "thread": [
            f" Introducing {fact_sheet['product_name']}",
            "Struggling with repetitive content tasks?",
            "One input → Blog, social media & email",
            "Stay consistent across all platforms",
            "Create faster. Work smarter. "
        ],
        
        "email": f"Discover how {fact_sheet['product_name']} can automate your content workflow and ensure consistent messaging across every platform."
    }
