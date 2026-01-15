# Netlify 배포 가이드

이 가이드는 `smart-classroom-toolkit` 프로젝트를 Netlify에 배포하는 방법을 설명합니다.

## 1. 준비 작업 (완료됨)
자동화 도구를 통해 다음 작업이 이미 수행되었습니다:
- **배포 설정 파일 추가**: `netlify.toml` 파일이 생성되어 Netlify가 빌드 설정을 자동으로 인식합니다.
- **빌드 테스트**: `npm run build` 명령이 성공적으로 실행됨을 확인했습니다.
- **Git 초기화**: 로컬 Git 저장소가 생성되고 현재 상태가 커밋되었습니다.

## 2. GitHub에 코드 업로드
Netlify는 GitHub 저장소와 연동하여 지속적인 배포(CD)를 설정하는 것이 가장 좋습니다.

1. [GitHub Create New Repository](https://github.com/new) 페이지로 이동하여 새 리포지토리를 생성합니다.
   - Repository name: `smart-classroom-toolkit` (또는 원하는 이름)
   - Public/Private 여부는 원하는 대로 선택합니다.
   - **"Initialize this repository with..."** 옵션들은 **모두 체크 해제** 상태로 둡니다 (이미 로컬에 코드가 있으므로).

2. 리포지토리가 생성되면, 터미널(VS Code 등)에서 다음 명령어를 입력하여 코드를 GitHub로 푸시합니다.
   (`YOUR_USERNAME` 부분을 본인의 GitHub 사용자명으로 변경하세요)

   ```bash
   git remote add origin https://github.com/sangmin-e2/classroomkit_busan.git
   git branch -M main
   git push -u origin main
   ```

## 3. Netlify에 배포하기

1. [Netlify](https://app.netlify.com/)에 로그인합니다.
2. 대시보드에서 **"Add new site"** 버튼을 누르고 **"Import an existing project"**를 선택합니다.
3. **"Deploy with GitHub"**를 선택하고 권한을 승인한 뒤, 방금 올린 `smart-classroom-toolkit` 저장소를 검색하여 선택합니다.
4. **Site settings** 단계에서 설정은 자동으로 채워질 것입니다:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   
   *(이 설정들은 `netlify.toml` 파일에 의해 자동으로 지정됩니다)*

5. **환경 변수 설정 (Optional)**:
   - 프로젝트가 Gemini API 등을 사용한다면 **"Environment variables"** 섹션에서 추가합니다.
   - Key: `GEMINI_API_KEY`
   - Value: `본인의_API_키`
   *(현재 코드상으로는 API 키 사용이 필수적이지 않을 수 있으나, AI 기능이 있다면 필수입니다)*

6. **"Deploy smart-classroom-toolkit"** 버튼을 클릭합니다.

## 4. 완료
잠시 후 "Production" 배포가 완료되면 초록색 링크(예: `https://random-name-12345.netlify.app`)가 생성됩니다. 해당 링크를 클릭하여 웹앱을 확인하세요.
