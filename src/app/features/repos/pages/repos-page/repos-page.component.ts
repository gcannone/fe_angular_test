import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReposApiService } from 'src/app/api/repos/repos-api.service';
import { ColumnConfig } from 'src/app/shared/components/table/table.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { Repository } from './../../../../api/repos/repos-dto';
import { NavigationExtras, Router } from '@angular/router';
import { PaginatorConfig } from 'src/app/shared/components/paginator/paginator.component';

interface RepoFilters {
  name: string;
  language: string;
  stars: number;
  issue: string;
}

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnDestroy {

  dataSource!: MatTableDataSource<Repository>;

  filters: RepoFilters = {
    name: '',
    issue: '',
    stars: 0,
    language: ''
  }

  paginatorConfig!: PaginatorConfig;

  isLoading = false;

  private readonly itemPerPage = 25;

  columns: ColumnConfig[] = [
    {
      name: 'name',
      label: 'Repo name',
      type: 'string'
    },
    {
      name: 'created_at',
      label: 'Creation date',
      type: 'date'
    },
    {
      name: 'avatar_url_owner',
      label: 'Owner avatar',
      type: 'string'
    }
  ];

  private _subs = new Subscription();

  constructor(
    private reposApiService: ReposApiService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  showRepository(repository: Repository) {
    this.router.navigate(['commits'],
      <NavigationExtras>{
        state: {
          repo: repository.full_name
        }
    });
  }

  changePage(page: 'next' | 'prev') {
    this.loadRepositories(
      this.filters.name,
      this.filters.language,
      this.filters.stars,
      this.filters.issue,
      page === 'next' ? this.paginatorConfig.currentPage + 1 : this.paginatorConfig.currentPage - 1
    );
  }

  applySearch(filters: any) {
    this.filters.name = filters.name ? filters.name : '';
    this.filters.language = filters.language ? filters.language : '';
    this.filters.stars = filters.stars ? filters.stars : null;
    this.filters.issue = filters.issue ? filters.issue : '';
    this.loadRepositories(this.filters.name, this.filters.language, this.filters.stars, this.filters.issue);
  }

  loadRepositories(name: string, language: string, stars: number, issue: string, page = 1) {
    this.isLoading = true;
    this._subs.add(
      this.reposApiService.getRepositories(name, language, stars, issue, page, this.itemPerPage)
        .subscribe(res => {
          this.isLoading = false;
          if (res) {
            if (!this.dataSource) {
              this.dataSource = new MatTableDataSource<Repository>(res.items);
            } else {
              this.dataSource.data = res.items;
            }
            this.paginatorConfig = {
              totalItems: res.total_count,
              currentPage: page,
              totalPages: Math.ceil(res.total_count / this.itemPerPage)
            };
          }
        })
    );
  }

}
