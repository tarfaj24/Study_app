def validate_password(password):
    if len(password) < 8 or len(password) > 50:
        return False
    
    has_letter = False
    has_number = False

    for symbol in password:
        if symbol.isalpha() and not has_letter:
            has_letter = True
        elif symbol.isnumeric() and not has_number:
            has_number = True
        if has_letter and has_number:
            break

    if not has_letter or not has_number:
        return False
    return True

def validate_username(username):
    if len(username) < 4 or len(username) > 50:
        return False
    return True



    