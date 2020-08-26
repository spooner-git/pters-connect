from rest_framework import permissions


class IsFacilityUpdateOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # 요청시 인증이 되어있지 않아도 조회는 혀용
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # 요청시 조회는 혀용 / 관리자는 허용
        if request.method in permissions.SAFE_METHODS or request.user.is_staff:
            return True
        # 요청시 작성한 사람만 허용
        return obj.member.user == request.user


class IsSubjectUpdateOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # 요청시 인증이 되어있지 않아도 조회는 혀용
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # 요청시 조회는 혀용 / 관리자는 허용
        if request.method in permissions.SAFE_METHODS or request.user.is_staff:
            return True
        # 요청시 작성한 사람만 허용
        return obj.member.user == request.user
