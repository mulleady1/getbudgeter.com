def is_mobile_device(user_agent):
    """
    Detect if the user agent indicates a mobile device.
    Returns True for mobile devices, False for desktop.
    """
    if not user_agent:
        return False

    user_agent = user_agent.lower()

    mobile_keywords = [
        'mobile', 'android', 'iphone', 'ipad', 'ipod',
        'blackberry', 'windows phone', 'webos', 'opera mini'
    ]

    return any(keyword in user_agent for keyword in mobile_keywords)
