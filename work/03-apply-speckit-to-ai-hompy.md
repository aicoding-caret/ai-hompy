# `ai-hompy` 프로젝트에 `spec-kit` 적용 계획

## 1. 목표
새로운 `ai-hompy` 프로젝트에 로컬 `spec-kit`의 CLI를 사용하여 `.caretrules`를 설정한다.

## 2. 작업 단계

### 단계 1: `specify-cli` 실행
- `ai-hompy` 프로젝트 루트에서 `uvx`를 사용하여 `spec-kit/src/specify_cli/__init__.py` 스크립트를 실행한다.
- `init . --ai cline` 인자를 전달하여 현재 디렉토리에 Caret/Cline 호환 템플릿 설치를 시작한다.
- **실행 명령어**: `uvx spec-kit/src/specify_cli/__init__.py init . --ai cline`

### 단계 2: 사용자 상호작용 안내
- CLI 실행 시 나타나는 "Choose your agent type:" 프롬프트에서 `Caret (.caretrules)`를 선택하도록 마스터께 안내한다.

### 단계 3: 결과 검증
- `specify-cli` 작업이 완료된 후, `ls -a` 명령어를 사용하여 `.caretrules` 디렉토리가 프로젝트 루트에 생성되었는지 확인한다.

## 3. 실행 도구
- `execute_command`
- `ask_followup_question` (사용자 상호작용 안내용)
